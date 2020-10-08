// TODO:




require('dotenv').config(); 

// necessary functions


const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

let mailOptions = {
    from: 'Memeforlife02@gmail.com',
    to: 'Jesseclind@gmail.com',
    subject: 'Testing and Testing',
    text: 'IT WORKS BRUH!'
};




var bfFoodList;

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://grovecity.cafebonappetit.com/cafe/hicks/2020-10-02/');
    

    // Returns list of foods form menu page.
    hicksFoodLists = await page.evaluate(() => {

        // necessary functions:
        // Deletes all objects with douplicate names in the given array.
        function removeDouplicates(a) {
            let aNames = [];
            let b = [];
            let aNew = [];
          
            // put only the names from the objects in a into an array.
            for (let i = 0; i < a.length; i++) {
              aNames.push(a[i].name);
            }
            
            // if the element is not a douplicate, we push the object into aNew.
            for (let i = 0; i < aNames.length; i++) {
              if (b.indexOf(aNames[i]) === -1) {
                b.push(aNames[i]);
                aNew.push(a[i]);
              }
            }
          
            return aNew;
        }


        // hicks meal food arrays.

        let hicksBreakfastList = [];
        let hicksLunchList = [];
        let hicksDinnerList = [];
        
        let tabOpen = document.getElementsByClassName('site-panel__daypart-accordion-btn');
        if (tabOpen[0].innerText != 'Collapse Daypart 1') { tabOpen[0].click() };
        if (tabOpen[1].innerText != 'Collapse Daypart 1') { tabOpen[1].click() };
        if (tabOpen[2].innerText != 'Collapse Daypart 1') { tabOpen[2].click() };

        // hicks(meal)ListLocation are the arrays of objects containing the HTML for each food elelment for each meal section
        let hicksBreakfastListLocation = document.querySelector('[id^="tab-content"]').getElementsByClassName('h4 site-panel__daypart-item-title');
        let hicksLunchListLocation = document.querySelector('#lunch .site-panel__daypart-wrapper .site-panel__daypart-tabs .c-tabs .c-tab__content.site-panel__daypart-tab-content').getElementsByClassName('h4 site-panel__daypart-item-title');
        let hicksDinnerListLocation = document.querySelector('#dinner .site-panel__daypart-wrapper .site-panel__daypart-tabs .c-tabs .c-tab__content.site-panel__daypart-tab-content').getElementsByClassName('h4 site-panel__daypart-item-title');
        
        // loops through all three arrays of food objects and searches for if the foods are vegan, vegetarian or gluten free
        // sets all variables in object which is then pushed to array hicksBreakfastList
        for (let i = 0; i < hicksBreakfastListLocation.length; i++) {
            
            let temp = { name: '', vegan: false, vegetarian: false, glutenFree: false};
            temp.name = hicksBreakfastListLocation[i].innerText.trim();

            if (hicksBreakfastListLocation[i].innerHTML.includes('egan')) { temp.vegan = true };
            if (hicksBreakfastListLocation[i].innerHTML.includes('egetarian')) { temp.vegetarian = true };
            if (hicksBreakfastListLocation[i].innerHTML.includes('luten')) { temp.glutenFree = true };

            hicksBreakfastList.push(temp);
        
        }
        for (let i = 0; i < hicksLunchListLocation.length; i++) {
            let temp = { name: '', vegan: false, vegetarian: false, glutenFree: false};
            temp.name = hicksLunchListLocation[i].innerText.trim();

            if (hicksLunchListLocation[i].innerHTML.includes('egetarian')) { temp.vegetarian = true };
            if (hicksLunchListLocation[i].innerHTML.includes('egan')) { temp.vegan = true };
            if (hicksLunchListLocation[i].innerHTML.includes('luten')) { temp.glutenFree = true };

            hicksLunchList.push(temp);
        }
        for (let i = 0; i < hicksDinnerListLocation.length; i++) {
            let temp = { name: '', vegan: false, vegetarian: false, glutenFree: false};
            temp.name = hicksDinnerListLocation[i].innerText.trim();

            if (hicksDinnerListLocation[i].innerHTML.includes('egetarian')) { temp.vegetarian = true };
            if (hicksDinnerListLocation[i].innerHTML.includes('egan')) { temp.vegan = true };
            if (hicksDinnerListLocation[i].innerHTML.includes('luten')) { temp.glutenFree = true };

            hicksDinnerList.push(temp);
        }


        // Clear duplicates from hicks food list arrays. 
        hicksBreakfastList = removeDouplicates(hicksBreakfastList);
        hicksLunchList = removeDouplicates(hicksLunchList);
        hicksDinnerList = removeDouplicates(hicksDinnerList);


        return hicksBreakfastList;
    })


    mailOptions.text = hicksFoodLists.toString();
    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("Email sent!");
        }
    });
})();



