# Bitcoin resources

The purpose of this repository is to store a single CSV file with a curated collection of resources to study and learn from Bitcoin (e.g. articles, books, podcasts, etc.).

## CSV file format

The following fields and formats are the ones to be used in the file.
The first row of the CSV file will be the name of the column (each field).

### date
A string of the format YYYY-MM-DD

### title
A string with the title of the resource.

### type
One of the following values:
- article
- book
- audio
- video
- course
- tool
- other

### link
A valid URL to the resource.

### language
A two-letter code of the language in which this resource is presented. If one resource (e.g. one article) is translated to several languages, this must be included in the file with one line per language.

### author
The name of the author.

### keywords
A comma separated list of keywords reflecting the main topics discussed in the resource.
Some suggested keywords are:
- wallets, economics, history, security, lightning, scaling, etc.

### other
Other metadata in the form of a JSON dictionary, that is, containig a set of key-value pairs. For example:
```
{ key1: "value1", key2: "value2" }
```
