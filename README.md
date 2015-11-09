# valfor.js
Valfor.js är ett bibliotek för att validera och formatera formulärsdata. Biblioteket är särskilt behjälpligt för att hantera forumlär där kunder anger data i en köpprocess, tex. i kassan på en e-handelssida.

## Användningsområden
Valfor.js kan användas i två syften; dels för att validera att forumlärsdata är giltig (korrekt) samt för att formatera datan i ett standardenligt format. Valfor.js har stöd för att validera följande typer av inmatad data:

* Mobiltelefonnummer
* Personnummer
* Samordningsnummer
* Organisationsnummer
* Postnummer
* Bankkortsnummer
* E-postadresser

Valfor.js kan också användas för att validera och formatera godtyckliga textsträngar, vilket är användbart för data som inte är standardiserad, tex. namn och adresser.

## Installation
```javascript
<script src="valfor.min.js"></script>
```

## Exempel på använding
Samtliga valideringsfunktioner returnerar 

### Mobiltelefonnummer
Mobiltelefonnummer valideras enligt [Post- & Telestyrelsens nummerplan](https://www.pts.se/sv/Bransch/Telefoni/Nummerfragor/Telefoninummerplanen/Telefoninummerplanens-disposition/) för mobiltelefonitjänster.
```javascript
console.log( valfor.cellphonenum("0702-112233") );
```

## Licens
Valfor.js omfattas av licensformen [MIT](https://opensource.org/licenses/MIT "The MIT License"). Varsågod!
