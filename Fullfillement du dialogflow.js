// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const admin = require('firebase-admin');

admin.initializeApp({

	credential: admin.credential.cert({
    
    "type": "service_account",
  "project_id": "traveler-77447",
  "private_key_id": "8cd28704065b8aa39ffdcda59568d874078a6fa9",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDPnZYoGQDIyMFh\nW9UrfdfLhifZzhOGFZRwRMHf4WwGignemi6LzEBdFTeGZ1kyMpibw7LJp0myCcpC\nO1C/FyQLt9nynp7s8PaIHHiQPQIz8Hl/3pmmxWqjzrgrejkgDhR2Hf+/7NNrjBrT\nZ15tjVNXQHPOvqTUH4V/OreWep3TGJIXzdxnddd2oFvh7McxkY6m5p2AtJPxE8X+\n0UMIh67rzmFtptCViXCzbw7Rkmhi3QvtjrznIWhn4Pxwi1fWlzV/0EUytsLl0F6h\nkAWmdK7TyWZGMAPZg3jP2SsA78pNUTzYB0doUPZXptSxbfuHXt0xEU3aArg/vAF9\n3dTm2hF1AgMBAAECggEAC5+10LxnohY1V4NZ+cOjsZorAIOMbcknBKsg1K1NDEet\nukgVG5AduWhu8ag3IvuYtj3cdHRYiK6KI6+o+23q/3n1aqNNYBQ0pVW8vUyhIzHP\nR6S5ow/yAsZX4t1Gtf/7zsoqr77tblvLg7MJoyYSuLOb2EMtvM+f/InXzgXC8NbZ\nN9Dg4icQsFh57ZCahPkr0hILbRWDvKZkkYrjpCr+tEgLVjPDAa12I83FvkV24Y6e\nHr5bXAgnKloRCDq/gGUa7emwmO9VAp0kx0ndt47dNo7IVBkyWDSiaD6t1Si4KpIx\nHNV2XZ9oQA2/BRCOHKxZCbvUBlVc7YNp+TVx2BHssQKBgQD1NJu1Tjrd995ii8OO\nku6joVjldq6OS00ugiu1Ao84L9M4fT/KQSd35x/nUDebnwTyH/+wuMYXvHfOEY0K\nSP7Uc4qh1/hNBctDm99lobmN/opDkfPKuWWIfexDcuJwShamXjergCWATsqbTBe4\naV3EX4+CErkzr6YqAAhpuHRsxQKBgQDYwVnoPAgAfuc2J6Pr67NPisCHR3Ec0RxX\nD0lk/sHlWeu7k4zphO0+W1MKaJbylA1tRhqUFNrxm+N1npXyfprZyC/DydI58n98\n6bPVhOiQWMdrez/oTgs7l38eFzbk0LViyumIHxgFlky9M+Z/T9toLMqrTqElnaYk\neRzOX9O88QKBgQDuGbWRKnOzEnuZSYoNKdQchBIkT0hU1/4MSU5TqDaWIqqB0e1d\nYkMHBSFPpe85aAKPck8AtYt1hQb4zMYd1J/OgJt/aI2tjRDBh9w3fgEGRsLPtiv7\nEGftUAlZvXbv/qFbz2VTXU4M93V5szvdUENC6mAZuECqVceORRXmQrya2QKBgQCU\nIkgEnApH9HKlox+3G0VXZhdAHMYkEJFSumLJgAYZbYPalPNnoG3XAOjWozYOILqw\nZInDjCE5n/UqrDAEIxxHHDXwk5x199HDF6DMmuGpzNK1FO1PIQ8yMc4xTWI5rJ1a\nIBzL55wuLVLSt4aemX/0STBVNQ6Su5QRNyhFrl3xsQKBgQCncogHCSzYBD3w/2jZ\nV8ODOe4SFUiLXB6qvCo+4BymthF/3hfH+WGehHcfuvIJkROasTFaV3gzzia+yQ0b\nuqo3veVbEGhXzSIaNFGID6cuQf/ah1lsolSFO8RaCKa8s3LdpTDFJIvTaOQC6+z4\n68RGLU4VFmy/JCOQ16PXzxlrXw==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-szlai@traveler-77447.iam.gserviceaccount.com",
  "client_id": "108478891726636848672",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-szlai%40traveler-77447.iam.gserviceaccount.com"	
      
    }),
  
  	databaseURL: "https://traveler-77447-default-rtdb.firebaseio.com/"
  
});
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
   function getLanguage(agent) {
  const languageCode = agent.languageCode;
 if (languageCode.startsWith('en')) {
return 'englich';
  } else if (languageCode.startsWith('fr')) {
   return 'fr';
  } else {
return 'uuu';
  }
}

function getRestaurant(agent) {
 // const language = getLanguage(agent);
  const city = agent.parameters.Cities;
  const foodType = agent.parameters.Food;
  const restaurantClass = agent.parameters.Class;
  
  let restaurantNames = [];
  let restaurantDesc = [];
  let restaurantNamesFr = [];
  let restaurantDescFr = [];
	
  if (agent.locale === 'en'){
  return admin.database().ref(`/EN/RESTAURANTS/${city}/cuisine marocaine/${restaurantClass}`).once('value', function(snapshot){
  
    snapshot.forEach(function(childSnapshot){
    
      const childName = childSnapshot.val().NAME;
      restaurantNames.push(childName);
      
      const childDesc = childSnapshot.val().descrip;
      restaurantDesc.push(childDesc);
      
    });
    
    const randomIndex = Math.floor(Math.random() * restaurantNames.length);
    const randomRestaurantName = restaurantNames[randomIndex];
    const randomRestaurantDesc = restaurantDesc[randomIndex];
    
    agent.add(`You can try  ${randomRestaurantName} and it's ${randomRestaurantDesc}`);
  });
  }
  else if (agent.locale === 'fr'){
  return admin.database().ref(`/FR/RESTAURANTS/${city}/cuisine marocaine/${restaurantClass}`).once('value', function(snapshot){
  
    snapshot.forEach(function(childSnapshot){
     
    
      const childNameFr = childSnapshot.val().NOM;
      restaurantNamesFr.push(childNameFr);
      
      const childDescFr = childSnapshot.val().descrip;
      restaurantDescFr.push(childDescFr);
      
    });
    
    const randomIndex = Math.floor(Math.random() * restaurantNamesFr.length);
    const randomRestaurantNameFr = restaurantNamesFr[randomIndex];
    const randomRestaurantDescFr = restaurantDescFr[randomIndex];
    
    agent.add(`Vous pouvez essayer ${randomRestaurantNameFr}. C'est un ${randomRestaurantDescFr}`);
  });
  }
}
  
  function getHotel(agent) {
  
  const hotelCity = agent.parameters.Cities;
  const hotelClass = agent.parameters.Class;
  
  let hotelNames = [];
  let hotelDesc = [];
  let hotelNamesFr = [];
  let hotelDescFr = [];
   if (agent.locale === 'en'){
  return admin.database().ref(`/EN/hotel/${hotelCity}/${hotelClass}`).once('value', function(snapshot){
  
    snapshot.forEach(function(childSnapshot){
    
      const childNameHotel = childSnapshot.val().NAME;
      hotelNames.push(childNameHotel);
      
      const childDescHotel = childSnapshot.val().descrip;
      hotelDesc.push(childDescHotel);
      
     });
    
    const randomHotelIndex = Math.floor(Math.random() * hotelNames.length);
    const randomHotelName = hotelNames[randomHotelIndex];
    const randomHotelDesc = hotelDesc[randomHotelIndex];
    
    agent.add(`You can try ${randomHotelName}. ${randomHotelDesc}`);

  
  });
   }
    else if (agent.locale === 'fr'){
      
      return admin.database().ref(`/FR/hotel/${hotelCity}/${hotelClass}`).once('value', function(snapshot){
  
    snapshot.forEach(function(childSnapshot){
    
      const childNameHotelFr = childSnapshot.val().NOM;
      hotelNamesFr.push(childNameHotelFr);
      
      const childDescHotelFr = childSnapshot.val().descrip;
      hotelDescFr.push(childDescHotelFr);
      
     });
    
    const randomHotelIndexFr = Math.floor(Math.random() * hotelNamesFr.length);
    const randomHotelNameFr = hotelNamesFr[randomHotelIndexFr];
    const randomHotelDescFr = hotelDescFr[randomHotelIndexFr];
    
    agent.add(`Vous pouvez essayer ${randomHotelNameFr}. ${randomHotelDescFr}`);
      
        });
    }
  
}
    
  
  function getMonument(agent) {
  
  let monumentCity = agent.parameters.Cities;
    
    if (!monumentCity){
    
      let monumentCities = ['Marrakech', 'Agadir', 'Esaouira', 'casablanca'];
      const randomCityIndex = Math.floor(Math.random() * 4);
      monumentCity = monumentCities[randomCityIndex];
      
    }
  
  let monumentNames = [];
  let monumentDesc = [];
  let monumentNamesFr = [];
  let monumentDescFr = [];
   if (agent.locale === 'en'){
  return admin.database().ref(`/EN/HISTORICAL MONUMENTS_PLACES/${monumentCity}/HISTORICAL MONUMENTS`).once('value', function(snapshot){
  
    snapshot.forEach(function(childSnapshot){
    
      const childNameMonument = childSnapshot.val().NAME;
      monumentNames.push(childNameMonument);
      
      const childDescMonument = childSnapshot.val().descrip;
      monumentDesc.push(childDescMonument);
      
     });
    
    const randomMonumentIndex = Math.floor(Math.random() * monumentNames.length);
    const randomMonumentName = monumentNames[randomMonumentIndex];
    const randomMonumentDesc = monumentDesc[randomMonumentIndex];
    
    agent.add(`${randomMonumentName} is one of the most wonderful historical monuments you can visit in ${monumentCity}. ${randomMonumentDesc}`);

  
  });
   }
    else if (agent.locale === 'fr'){
      
      return admin.database().ref(`/FR/MONUMENTS HISTORIQUES_ENDROITS/${monumentCity}/MONUMENTS HISTORIQUES`).once('value', function(snapshot){
  
    snapshot.forEach(function(childSnapshot){
    
      const childNameMonumentFr = childSnapshot.val().NOM;
      monumentNamesFr.push(childNameMonumentFr);
      
      const childDescMonumentFr = childSnapshot.val().descrip;
      monumentDescFr.push(childDescMonumentFr);
      
     });
    
    const randomMonumentIndexFr = Math.floor(Math.random() * monumentNamesFr.length);
    const randomMonumentNameFr = monumentNamesFr[randomMonumentIndexFr];
    const randomMonumentDescFr = monumentDescFr[randomMonumentIndexFr];
    
    agent.add(`${randomMonumentNameFr} est l'un des plusieurs monuments historiques que vous pouvez visiter à ${monumentCity}. ${randomMonumentDescFr}`);
      
        });
    }
  
} 
  
  
  function getLandscape(agent) {
  
  let landscapeCity = agent.parameters.Cities;
    
    if (!landscapeCity){
    
      let landscapeCities = ['Marrakech', 'Agadir', 'Esaouira', 'casablanca'];
      const randomCityIndex = Math.floor(Math.random() * 4);
      landscapeCity = landscapeCities[randomCityIndex];
      
    }
  
  let landscapeNames = [];
  let landscapeDesc = [];
  let landscapeNamesFr = [];
  let landscapeDescFr = [];
   if (agent.locale === 'en'){
  return admin.database().ref(`/EN/HISTORICAL MONUMENTS_PLACES/${landscapeCity}/PLACES`).once('value', function(snapshot){
  
    snapshot.forEach(function(childSnapshot){
    
      const childNameLandscape = childSnapshot.val().NAME;
      landscapeNames.push(childNameLandscape);
      
      const childDescLandscape = childSnapshot.val().descrip;
      landscapeDesc.push(childDescLandscape);
      
     });
    
    const randomLandscapeIndex = Math.floor(Math.random() * landscapeNames.length);
    const randomLandscapeName = landscapeNames[randomLandscapeIndex];
    const randomLandscapeDesc = landscapeDesc[randomLandscapeIndex];
    
    agent.add(`${randomLandscapeName} is one of the most wonderful places you can visit in ${landscapeCity}. ${randomLandscapeDesc}`);

  
  });
   }
    else if (agent.locale === 'fr'){
      
      return admin.database().ref(`/FR/MONUMENTS HISTORIQUES_ENDROITS/${landscapeCity}/ENDROITS`).once('value', function(snapshot){
  
    snapshot.forEach(function(childSnapshot){
    
      const childNameLandscapeFr = childSnapshot.val().NOM;
      landscapeNamesFr.push(childNameLandscapeFr);
      
      const childDescLandscapeFr = childSnapshot.val().descrip;
      landscapeDescFr.push(childDescLandscapeFr);
      
     });
    
    const randomLandscapeIndexFr = Math.floor(Math.random() * landscapeNamesFr.length);
    const randomLandscapeNameFr = landscapeNamesFr[randomLandscapeIndexFr];
    const randomLandscapeDescFr = landscapeDescFr[randomLandscapeIndexFr];
    
    agent.add(`${randomLandscapeNameFr} est l'un des places magnifiques que vous pouvez visiter à ${landscapeCity}. ${randomLandscapeDescFr}`);
      
        });
    }
  
} 
  


  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('Restauration', getRestaurant);
  intentMap.set('Logement',  getHotel); 
  intentMap.set('Historical', getMonument);
  intentMap.set('Landscapes', getLandscape);
  agent.handleRequest(intentMap);
});
