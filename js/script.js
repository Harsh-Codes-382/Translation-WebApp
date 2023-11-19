const selectTag = document.querySelectorAll('select');
const translatebtn = document.querySelector('button');
const fromtext = document.querySelector('.from_text');
const totext = document.querySelector('.to_text');
const ExchangeIcon = document.querySelector('.exchange');
const icon = document.querySelectorAll('.icons');
const limits = document.querySelector('.limits');
const Count = document.querySelector('#Count');

selectTag.forEach((tag, id) => {
  for (const c_code in countries) {
    // console.log(countries[c_code]); // we access the value of object

    // WE ARE MAKING ENGLISH AND HINDI BY DEFAULT LANGUAGE BY MAKING THEM SELECTED
    let selected;
    if (id == 0 && c_code == 'en-GB') {
      selected = 'selected';
    }
    else if (id == 1 && c_code == 'hi-IN') {
      selected = 'selected';
    }
    let option = `<option value="${c_code}" ${selected}>${countries[c_code]}</option>`;
    tag.insertAdjacentHTML('beforeend', option);  // we write the object values in to place of elements of option 
  }
});

translatebtn.addEventListener('click', () => {

  let text = fromtext.value;
  let translatefrom = selectTag[0].value;  // get the select value of from text 
  let translateto = selectTag[1].value;  //get the select value of to text
  if (!text) return;    //if fromtext value is empty & btn is clicked it will return nothing.
  totext.setAttribute('placeholder', 'Translating...');  // when data is fetching then placeholder is this
  let apiURL = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translatefrom}|${translateto}`;
  fetch(apiURL).then((value) => value.json()).then((value1) => {
    totext.value = value1.responseData.translatedText;
    totext.setAttribute('placeholder', 'Translated');  // once data fetched placeholder will this

  });
});

// Exchange icon to swapping the text and select value too

ExchangeIcon.addEventListener('click', () => {
  // swapping the text values
  let tempv = fromtext.value;
  fromtext.value = totext.value;
  totext.value = tempv;
  // swapping the select values
  let templ = selectTag[1].value;
  selectTag[1].value = selectTag[0].value;
  selectTag[0].value = templ;
})

// accessing the icon click
icon.forEach((ele) => {
  ele.addEventListener('click', ({ target }) => {  // target tells the name of class of icon which is clicked
    if (target.classList.contains('fa-copy')) {
      if (target.id == 'from') {
        navigator.clipboard.writeText(fromtext.value);  // it will copy the fromtext ki value 
      }
      else {
        navigator.clipboard.writeText(totext.value);    // it will copy the totext ki value 
      }
    }
    else {
      let utterance;
      if (target.id == 'from') {
        utterance = new SpeechSynthesisUtterance(fromtext.value);  //this speech api speak the fromtext ki value
        utterance.lang = selectTag[0].value;    //this speech api speak the fromtext ki value in selected language
      }
      else {
        utterance = new SpeechSynthesisUtterance(totext.value);  //this speech api speak the totext ki value
        utterance.lang = selectTag[1].value;  //this speech api speak the totext ki value in selected language
      }
      speechSynthesis.speak(utterance);  // now we have passed the all values to utterance variable api will speak that.
    }
  });
});

// counting the word;
const countChars = (obj) => {  // 'obj' is reference of 'this' we are passing in html
  let max_len = 5000;
  limits.innerHTML = `<p>${obj.value.trim().length}/5000 characters</p>`;
  if(obj.value.trim().length>max_len){
    alert("Your text length reached limit");
    return;
  }
}
