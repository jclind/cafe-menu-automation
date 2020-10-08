// TODO:




require('dotenv').config(); 

// necessary functions

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
    bfFoodList = await page.evaluate(() => {
        let bTabOpen = document.getElementsByClassName('site-panel__daypart-accordion-btn');
        if (bTabOpen[0].innerText != 'Collapse Daypart 1') {
            bTabOpen[0].click();
        }

        // hicksListLocation is the array of objects containing the HTML for each food elelment on the page
        let hicksListLocation = document.querySelector('[id^="tab-content"]').getElementsByClassName('h4 site-panel__daypart-item-title');
        let hicksBreakfastList = []

        // loops through array of food objects and searches for if the foods are vegan, vegetarian or gluten free
        // sets all variables in object which is then pushed to array hicksBreakfastList
        for (let i = 0; i < hicksListLocation.length; i++) {
            
            if (hicksBreakfastList.name != undefined && !(hicksBreakfastList.name).includes(hicksListLocation[i].name)) {
                let temp = { name: '', vegan: false, vegetarian: false, glutenFree: false};
                temp.name = hicksListLocation[i].innerText;

                if (hicksListLocation[i].innerHTML.includes('egan')) { temp.vegan = true };
                if (hicksListLocation[i].innerHTML.includes('egetarian')) { temp.vegetarian = true };
                if (hicksListLocation[i].innerHTML.includes('luten')) { temp.glutenFree = true };

                hicksBreakfastList.push(temp);
            }
            
        }

        // Clear duplicates from hicksBreakfastList array. 
        hicksBreakfastList = removeDouplicates(hicksBreakfastList);





        return foodList;
    })







    mailOptions.text = bfFoodList;
    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            console.log("ERROR!!!");
        } else {
            console.log("Email sent!");
        }
    });
})();



