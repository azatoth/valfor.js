# valfor.js
Valfor.js är ett bibliotek för att validera och formatera formulärsdata. Biblioteket är särskilt behjälpligt för att hantera forumlär där kunder anger data i en köpprocess, tex. i kassan på en e-handelssida.

## Användningsområden
Valfor.js kan användas i två syften; dels för att validera att forumlärsdata är giltig (korrekt) samt för att formatera datan i ett standardenligt format. Valfor.js har stöd för att validera följande typer av inmatad data:

* [Mobiltelefonnummer](https://github.com/jop-io/valfor.js/blob/master/README.md#mobiltelefonnummer)
* [Personnummer](https://github.com/jop-io/valfor.js/blob/master/README.md#personnummer)
* [Samordningsnummer](https://github.com/jop-io/valfor.js/blob/master/README.md#samordningsnummer)
* [Organisationsnummer](https://github.com/jop-io/valfor.js/blob/master/README.md#organisationsnummer)
* [Postnummer](https://github.com/jop-io/valfor.js/blob/master/README.md#postnummer)
* Bankkortsnummer
* E-postadresser

Valfor.js kan också användas för att validera och formatera godtyckliga textsträngar, vilket är användbart för data som inte är standardiserad, tex. namn och adresser.

## Installation
```javascript
<script src="valfor.min.js"></script>
```

## Exempel på använding
Samtliga valideringsfunktioner returnerar inmatad data (med formatering) om datan valideras som giltig. I fall datan valideras som ogiltig returneras *false*.

### Mobiltelefonnummer
Mobiltelefonnummer valideras enligt [Post- & Telestyrelsens nummerplan](https://www.pts.se/sv/Bransch/Telefoni/Nummerfragor/Telefoninummerplanen/Telefoninummerplanens-disposition/) för mobiltelefonitjänster. De svenska mobiltelefonitjänsterna inleds med prefixen *70*, *72*, *73*, *76* och *79*.

Mobiltelefonnummer som valideras som giltiga returneras formaterade. För att välja format på datan som returneras anges en sekundär parameter med värde 1 till 3. De format som stöds är:

1. Numeriskt format (standard), *NNNNNNNNNN*
2. Internationellt format E.164, *+46NNNNNNNNN*
3. Nationellt format, *NNN-NNN NN NN*

**Numerisk formatering**
```javascript
valfor.cellphonenum("0702112233"); // returnerar 0702112233
valfor.cellphonenum("+460702112233"); // returnerar 0702112233
valfor.cellphonenum("070-211 22 33"); // returnerar 0702112233
```
**Internationell formatering**
```javascript
valfor.cellphonenum("0702112233", 2); // returnerar +46702112233
valfor.cellphonenum("+460702112233", 2); // returnerar +46702112233
valfor.cellphonenum("070-211 22 33", 2); // returnerar +46702112233
```
**Nationell formatering**
```javascript
valfor.cellphonenum("0702112233", 3); // returnerar 070-211 22 33
valfor.cellphonenum("+460702112233", 3); // returnerar 070-211 22 33
valfor.cellphonenum("070-211 22 33", 3); // returnerar 070-211 22 33
```
**Ej giltiga telefonnummer (returnerar false)**
```javascript
valfor.cellphonenum("0710112233"); // returnerar false
valfor.cellphonenum("07021122"); // returnerar false
valfor.cellphonenum("0812345678"); // returnerar false
```

### Personnummer
Personnummer valideras i enlighet med [Folkbokföringslagen 1991:481, § 18 ](https://www.riksdagen.se/sv/Dokument-Lagar/Lagar/Svenskforfattningssamling/sfs_sfs-1991-481/) och [SKV 704](http://www.skatteverket.se/privat/sjalvservice/blanketterbroschyrer/broschyrer/info/704.4.39f16f103821c58f680007993.html). Notera att personnummer med ett angivet födelseår större än det nuvarande kalenderåret valideras som ogiltiga.

### Samordningsnummer
Samordningsnummer valideras i enlighet med [Folkbokföringslagen 1991:481, § 18 ](https://www.riksdagen.se/sv/Dokument-Lagar/Lagar/Svenskforfattningssamling/sfs_sfs-1991-481/) och [SKV 707](http://www.skatteverket.se/privat/sjalvservice/blanketterbroschyrer/broschyrer/info/707.4.39f16f103821c58f680007997.html). Notera att samordningsnummer med ett angivet födelseår större än det nuvarande kalenderåret valideras som ogiltiga.

### Organisationsnummer
Organisationsnummer valideras i enlighet med [Lagen om identitetsbeteckning för juridiska personer (1974:174)](https://www.riksdagen.se/sv/Dokument-Lagar/Lagar/Svenskforfattningssamling/sfs_sfs-1974-174/) och [SKV 709](https://www.skatteverket.se/foretagorganisationer/sjalvservice/blanketterbroschyrer/broschyrer/info/709.4.39f16f103821c58f680008001.html).

### Postnummer
Postnummer valideras i enlighet med [SS 613401:2011](http://www.sis.se/sociologi-service-f%C3%B6retagsorganisation-och-ledning-och-administration/postala-tj%C3%A4nster/ss-6134012011) och det [Svenska Postnummersystemet](http://www.postnummerservice.se/information/faq/adresser-och-postnummer/hur-aer-postnummer-uppbyggda-i-sverige).

### Bankkortsnummer
Kontrollerar om ett bankkortsnummer är giltigt i enlighet med ISO/IEC 7812-1:2015.

### E-postadress
asd

### Text
asd

## Licens
Valfor.js omfattas av licensformen [MIT](https://opensource.org/licenses/MIT "The MIT License"). Varsågod!
