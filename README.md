# Wish games

Welkom op mijn GitHub-project tech! Dit was een schoolproject waarbij ik een applicatie heb gemaakt om mijn feature te registreren. Op deze applicatie kun je games vinden en bewaren om ze later te kunnen kopen. Maar om dat te kunnen doen, moet je eerst kunnen aanmelden op de pagina. Op mijn [wiki](https://github.com/Alexiatech/Tech23/wiki/Wiki)  vertel ik uitgebreid over mijn proces.


<img width="186" alt="Screenshot 2023-03-15 at 23 20 07" src="https://user-images.githubusercontent.com/118124953/226986368-81fb4094-d6ac-4855-9cd5-a3475e71e842.png">


# Het concept
Wish games is een applicatie waar je games kunt bekijken en bewaren zodat je deze later kunt kopen of meteen kunt kopen. Maar mijn applicatie zou niet werken als je niet kunt registreren. Hoe zou de applicatie anders weten wie de games opslaat? Daarom ben ik dieper ingedoken om deze feature (registreren) te bekijken, welke plug-ins ik nodig had en welke code je moet gebruiken om deze werkend te maken. In mijn idee & concept vertel ik verder over de applicatie.

![ps4-games](https://user-images.githubusercontent.com/118124953/226986553-871f5a5a-743b-4e3a-9fe1-5e7060a86a1a.gif)



Wat moet je installeren!
Voordat je Wish games installeert, moet je eerst dit installeren.
## GIT
* Ga naar je terminal en installeer GIT.
* Als je dit hebt gedaan, moet je controleren met GIT --version.
Node.js
* Installeer node op je terminal met "node install".
* Controleer daarna of je wel de laatste versie hebt gedownload. Dan krijg je bijvoorbeeld dit te zien: v18.8.0.
# MongoDB
Voordat je feature kan werken, heb je een database nodig zodat je de data kan opslaan. Hiervoor heb ik MongoDB als database gebruikt om de data van de geregistreerde gebruikers op te slaan op de site. Op mijn wiki vertel ik hier meer over!
Om je gegevens terug te kunnen vinden op MongoDB, moet je een cluster maken waar je de data wilt zetten. Geef deze een naam die je kunt herkennen.
Daarna ga je bij MongoDB naar de collections om een database te maken. Geef deze een naam zoals 'gebruikersgegevens' en als tweede naam 'gegevens'.
Via Visual Studio Code kun je aangeven wat je in deze database wilt zetten, zodat alles goed komt te staan in de database:

![kuzt9r42or1fxvlq2-Meta_Generic](https://user-images.githubusercontent.com/118124953/226986997-b0813d07-60d4-4407-9691-4d2e410ed996.png)

 |Field |	Value |
 | ------------- |:-------------:| 
|_id |	 Een nummer die mongoDB geeft aan deze data. Zodat alle data uniek blijft. |
|Name |	De naam die hebt in gevuld op de site |
|Pwd	| Een wachtwoord die is ingevuld op de site ( zorge ervoor dat deze ook geheim blijft op je database: 2b$10$nYdCriyTEcOuzRzVI0Jh4uWMnomxi2.Rt5hCgoPZxmClZ3KQxlLYq) |
|Email |	De email-adres die je hebt ingevuld op de site. |
|Country |De gekozen land die hebt ingevuld op de site.|
|Birthday |	De aangegeven verjaardag die hebt ingevuld op de site.| 

Met deze data kan de applicatie zien wie er op site zit en kan je persoonlijke aanpassingen hiemeer opslaan. 

## Env. 

Om ervoor te zorgen dat je niet gehackt wordt moet je eigen wachtwoord van je MongoDB beveiligen. Dat doe je doormiddel van een env. Bestand aan te maken en deze in je gitignore te stoppen.

In je env. Zet je : 

PASSWORD= met je eigen wachtwoord 
En dan zet je PASSWORD in de code waar je connect met MongDB. 

## App-installeren 

Om je project op GitHub te plaatsen moet je het het eerst clonen op je terminal doormiddel: 

git clone https://github.com/Alexiatech/Tech23

Zodat je project online staat op Github. Zonder dar hackers je database kunnen hacken. 

## NPM 

Om je website te zien moet je deze bekijken op je localhost. 

Dit kan je doen doormiddel van npm kan je de nieuwe versier door pushen naar je localhost. 

Eerst installeer je nam op je terminal: npm install 
Daarna bekijk je of je de goede versie hebt gedownload door middel 
van npm —version te typen op je terminal. Zodat je kan zien of wel de nieuwsre versie hebt gedownload. 

Met je terminal kan je nu npm start aangeven om je node.js op de server te laten werken. 

Je geeft ook op code aan op welke localhost jij wilt werken 
Bijv: const port = 2000;

En geef je dit aan op de browser: 

http://localhost:2000/

De app is ontworpen om op een telefoon scherm te werken. om dit goed te laten zien op je browser moet je rechtmuis knop drukken moet je naar inspect gaan en daar kan je de formaat van de site aanpassen. 


##Vakken 

|Vakken |	Programmeer Taal	|Editor|
| ------------- |:-------------:| -------------|
|Project Tech |	GIT & Github |	 [Repository](https://github.com/Alexiatech/Tech23/wiki/Wiki)|
|Front-end  development |	EJS, JS, Html & css	|Visual Studio Code|
|Back-end development |	Node.js |	Visual Studio Code|

## Licence 
Ik gebruik als licence MI![3_0](https://user-images.githubusercontent.com/118124953/226986684-d7f9629a-32cf-4789-b068-c6a1cdedd3e9.png)
T license 


