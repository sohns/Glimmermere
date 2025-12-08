//Css and other fixes
//Fix for text area
$('textarea').each(function() {
          var $textarea = $(this);
          var parentData = $textarea.parent().data('internal-value');

          if (parentData !== undefined) {
              $textarea.val(parentData);
              $textarea.height(1);
              $textarea.height($textarea[0].scrollHeight);
          }
      });

//Main page Code      
//Code to let user submit passcode
const passcodeInput = document.getElementById('passcodeInput');
      if (passcodeInput) {
        passcodeInput.classList.add('.ignore-text-css');
          const passcodeSubmit = document.getElementById('passcodeSubmit');
          if (passcodeSubmit) {
              passcodeSubmit.addEventListener('click', () => {
                  const value = passcodeInput.value;
                  localStorage.setItem('passcode', value);
                  console.log('Passcode saved:', value);
                  alert("Welcome:" + atob(value));
              });
          }
      }

// Functions      
// This one gets yaml 
function getYamlFieldValues(fieldName) {
          const preBlock = document.querySelector('pre.frontmatter.language-yaml code.language-yaml');
          if (!preBlock) return [];

          const text = preBlock.textContent;
          const regex = new RegExp(fieldName + '\\s*:\\s*\\n((?:\\s*-\\s*.+\\n?)+)');
          const match = text.match(regex);

          if (!match) return [];

          return match[1]
              .split('\n')
              .map(line => line.trim().replace(/^- /, ''))
              .filter(line => line.length > 0);
      }

//Code for hiding if playerhidden
//Code for hiding if dmhidden
      $('[data-callout="playerhidden"]').each(function() {
          // 'this' refers to the current element in the loop
          const $elem = $(this);
          $elem.addClass("hiddenItem")
          const playerName = $(this).find('.callout-title-inner').text().replace(' Hidden', '').trim();
          const passcodeDecoded = atob(localStorage.getItem("passcode"));
          if (playerName == passcodeDecoded) {
              $elem.removeClass("hiddenItem")
          }
      });