# valfor.js (v0.9)
Valfor.js är ett bibliotek för att validera och formatera formulärsdata. Biblioteket är särskilt behjälpligt för att hantera forumlär där kunder anger data i en köpprocess, tex. i kassan på en e-handelssida.

## Användningsområden
Valfor.js kan användas i två syften; dels för att validera att forumlärsdata är giltig (korrekt) samt för att formatera datan i ett standardenligt format. Valfor.js har stöd för att validera följande typer av inmatad data:

* [Mobiltelefonnummer](#mobiltelefonnummer)
* [Personnummer](#personnummer)
* [Samordningsnummer](#samordningsnummer)
* [Organisationsnummer](#organisationsnummer)
* [Postnummer](#postnummer)
* [Bankkortsnummer](#bankkortsnummer)
* [E-postadresser](#e-postadress)

Valfor.js kan också användas för att validera och formatera godtyckliga textsträngar, vilket är användbart för data som inte är standardiserad, tex. namn och adresser.

# Installation

## Webläsare

Du kan installera genom att använda bower:

```bash
$ bower install valfor
```
Sedan är det bara att inkludera:

```html
<script src="valfor.min.js"></script>
```

## Node.js

```bash
$ npm install --save valfor
```

```js
var valfor = require('valfor');
```

# Exempel på använding
Samtliga valideringsfunktioner returnerar inmatad data (med formatering) om datan valideras som giltig. I fall datan valideras som ogiltig returneras *false*.

### Mobiltelefonnummer
Mobiltelefonnummer valideras enligt [Post- & Telestyrelsens nummerplan](https://www.pts.se/sv/Bransch/Telefoni/Nummerfragor/Telefoninummerplanen/Telefoninummerplanens-disposition/) för mobiltelefonitjänster. De svenska mobiltelefonitjänsterna inleds med prefixen *70*, *72*, *73*, *76* och *79*.

Mobiltelefonnummer vilka valideras som giltiga returneras formaterade. För att välja format på datan som returneras anges en sekundär parameter med följande värden:

* `valfor.NUMERICAL_FORMAT` Numeriskt (standard), `NNNNNNNNNN`
* `valfor.INTERNATIONAL_FORMAT` Internationellt E.164, `+46NNNNNNNNN`
* `valfor.NATIONAL_FORMAT` Nationellt, `NNN-NNN NN NN`

**Numerisk formatering**
```javascript
valfor.cellphonenum("0702112233"); // returnerar '0702112233'
valfor.cellphonenum("+460702112233"); // returnerar '0702112233'
valfor.cellphonenum("070-211 22 33"); // returnerar '0702112233'
```
**Internationell formatering**
```javascript
valfor.cellphonenum("0702112233", valfor.INTERNATIONAL_FORMAT); // returnerar '+46702112233'
valfor.cellphonenum("+460702112233", valfor.INTERNATIONAL_FORMAT); // returnerar '+46702112233'
valfor.cellphonenum("070-211 22 33", valfor.INTERNATIONAL_FORMAT); // returnerar '+46702112233'
```
**Nationell formatering**
```javascript
valfor.cellphonenum("0702112233", valfor.NATIONAL_FORMAT); // returnerar '070-211 22 33'
valfor.cellphonenum("+460702112233", valfor.NATIONAL_FORMAT); // returnerar '070-211 22 33'
valfor.cellphonenum("070-211 22 33", valfor.NATIONAL_FORMAT); // returnerar '070-211 22 33'
```
**Ej giltiga telefonnummer (returnerar false)**
```javascript
valfor.cellphonenum("0710112233"); // returnerar false
valfor.cellphonenum("07021122"); // returnerar false
valfor.cellphonenum("0812345678"); // returnerar false
```

### Personnummer
Personnummer valideras i enlighet med [Folkbokföringslagen 1991:481, § 18 ](https://www.riksdagen.se/sv/Dokument-Lagar/Lagar/Svenskforfattningssamling/sfs_sfs-1991-481/) och [SKV 704](http://www.skatteverket.se/privat/sjalvservice/blanketterbroschyrer/broschyrer/info/704.4.39f16f103821c58f680007993.html). Notera att personnummer med ett angivet födelseår större än det nuvarande kalenderåret valideras som ogiltiga.

Personnummer vilka valideras som giltiga returneras formaterade. För att välja format på datan som returneras anges en sekundär parameter som kan ha en kombination ab följande värden:

* `valfor.ADD_SEPARATOR`, inkludera skiljetecken
* `valfor.NBR_DIGITS_10`, 10 siffror
* `valfor.NBR_DIGITS_12`, 12 siffror (standard)

&ast;*Skiljetecken är antingen "-" eller "+" beroende på om födelseåret inträffade för +100 år sedan.*

**Formatering på personnummer vilka valideras som giltiga**
```javascript
valfor.personalidnum("900101-5701", valfor.NBR_DIGITS_12); // returnerar '199001015701'
valfor.personalidnum("900101-5701", valfor.NBR_DIGITS_12 | valfor.ADD_SEPARATOR); // returnerar '19900101-5701'
valfor.personalidnum("900101-5701", valfor.NBR_DIGITS_10); // returnerar '9001015701'
valfor.personalidnum("900101-5701", valfor.NBR_DIGITS_10 | valfor.ADD_SEPARATOR); // returnerar '900101-5701'
valfor.personalidnum("100101+1145", valfor.NBR_DIGITS_12); // returnerar '191001011145'
valfor.personalidnum("191001011145", valfor.NBR_DIGITS_12 | valfor.ADD_SEPARATOR); // returnerar '19100101+1145'
valfor.personalidnum("191001011145", valfor.NBR_DIGITS_10 | valfor.ADD_SEPARATOR); // returnerar '100101+1145'
```
**Ej giltiga personnummer (returnerar false)**
```javascript
valfor.personalidnum("900101-5705", valfor.NBR_DIGITS_12); // returnerar false (felaktig kontrollsiffra)
valfor.personalidnum("20900101-5701", valfor.NBR_DIGITS_12 | valfor.ADD_SEPARATOR); // returnerar false (ogiltig födelseår)
valfor.personalidnum("901301-5701", valfor.NBR_DIGITS_10); // returnerar false (ogiltigt födelsemånad)
valfor.personalidnum("900132-5701", valfor.NBR_DIGITS_10 | valfor.ADD_SEPARATOR); // returnerar false (ogiltigt födelsedag)
```

### Samordningsnummer
Samordningsnummer valideras i enlighet med [Folkbokföringslagen 1991:481, § 18 ](https://www.riksdagen.se/sv/Dokument-Lagar/Lagar/Svenskforfattningssamling/sfs_sfs-1991-481/) och [SKV 707](http://www.skatteverket.se/privat/sjalvservice/blanketterbroschyrer/broschyrer/info/707.4.39f16f103821c58f680007997.html). Notera att samordningsnummer med ett angivet födelseår större än det nuvarande kalenderåret valideras som ogiltiga.

### Organisationsnummer
Organisationsnummer valideras i enlighet med [Lagen om identitetsbeteckning för juridiska personer (1974:174)](https://www.riksdagen.se/sv/Dokument-Lagar/Lagar/Svenskforfattningssamling/sfs_sfs-1974-174/) och [SKV 709](https://www.skatteverket.se/foretagorganisationer/sjalvservice/blanketterbroschyrer/broschyrer/info/709.4.39f16f103821c58f680008001.html).

Organisationsnummer vilka valideras som giltiga returneras formaterade. För att välja format på datan som returneras anges en sekundär parameter med följande värden:

* `valfor.ADD_SEPARATOR`, inkludera skiljetecken
* `valfor.NBR_DIGITS_10`, 10 siffror (standard)
* `valfor.NBR_DIGITS_12`, 12 siffror

```javascript
    valfor.orgidnum('555555-5555'); // returnerar '5555555555'
    valfor.orgidnum('555555-5555', valfor.ADD_SEPARATOR); // returnerar '555555-5555'

    valfor.orgidnum('555555-5555', valfor.NBR_DIGITS_10); // returnerar '5555555555'
    valfor.orgidnum('555555-5555', valfor.NBR_DIGITS_10 | valfor.ADD_SEPARATOR); // returnerar '555555-5555'

    valfor.orgidnum('555555-5555', valfor.NBR_DIGITS_12); // returnerar '165555555555'
    valfor.orgidnum('555555-5555', valfor.NBR_DIGITS_12 | valfor.ADD_SEPARATOR); // returnerar '16555555-5555'

    valfor.orgidnum('0710112233'); // returnerar false
    valfor.orgidnum('07021122'); // returnerar false
    valfor.orgidnum('0812345678'); // returnerar false
```

### Postnummer
Postnummer valideras i enlighet med [SS 613401:2011](http://www.sis.se/sociologi-service-f%C3%B6retagsorganisation-och-ledning-och-administration/postala-tj%C3%A4nster/ss-6134012011) och det [Svenska Postnummersystemet](http://www.postnummerservice.se/information/faq/adresser-och-postnummer/hur-aer-postnummer-uppbyggda-i-sverige).

Postnummer vilka valideras som giltiga returneras formaterade. För att välja format på datan som returneras anges en sekundär parameter med värde 1 till 3. De format som stöds är:

* `valfor.NUMERICAL_FORMAT` Numeriskt (standard), `NNNNN`
* `valfor.NATIONAL_FORMAT` Nationellt, `NNN NN`
* `valfor.INTERNATIONAL_FORMAT` `SE-NNN NN`

**Formatering av postnummer vilka valideras som giltiga**
```javascript
valfor.zipcode("54100", valfor.NUMERICAL_FORMAT); // returnerar '54100'
valfor.zipcode("54100", valfor.NATIONAL_FORMAT); // returnerar '541 00'
valfor.zipcode("54100", valfor.INTERNATIONAL_FORMAT); // returnerar 'SE-541 00'
```
**Ej giltiga postnummer (returnerar false)**
```javascript
valfor.zipcode("00001", valfor.NUMERICAL_FORMAT); // returnerar false (ogiltigt värde)
valfor.zipcode("49152", valfor.NATIONAL_FORMAT); // returnerar false (ogiltig nummerserie)
valfor.zipcode("123", valfor.INTERNATIONAL_FORMAT); // returnerar false (ogiltigt längd)
```

### Bankkortsnummer
Kontrollerar om ett bankkortsnummer är giltigt i enlighet med ISO/IEC 7812-1:2015.

### E-postadress
asd

### Text
asd

## Licens
Valfor.js omfattas av licensformen [MIT](https://opensource.org/licenses/MIT "The MIT License"). Varsågod!
