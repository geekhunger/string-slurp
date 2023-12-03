# Readme

Imagine doing this...
<br>(Whitespaces have been indicated by dots '.')

```txt
....const multiline_text.=.`
........Hello world!
........How much is the fish?
....`
```

If you write the value of `multiline_text` into a file, you'll notice some unwanted newline (\n) and tab (\t) characters in front of each line! The build-in `String.trim()`method of JavaScript wouldn't help here, because it only removes leading and trailing spaces around the entire string but not the unwanted spaces before every line.

This package flattens multiline strings in more predictable ways.

Basically it takes a multiline string, splits it into single lines, then loops through each line, finding the common line indentation and removing it (also removing trailing line spaces). Finally it joins the lines back into a single multiline string.

## Install

Run `npm i string-slurp@latest`, then import the package:

```js
// Both import variants are equal!
import strim from "string-slurp"
import {strim} from "string-slurp"
```

## Use

The package exports a single function `strim(text, oneliner = false)` where `text` argument must be a `'string'`.

The optional `oneliner = true` setting will create a multiline shell command (by removing nested linebreaks and appending '\' to each line ending).

Here's an example of a larger compilation:

```js
strim(`

    # Application can not operate on files outside its ownership or realm.
    # If Certbot saves certificates at its default --config-dir (/etc/letsencrypt) then copy and give them appropriate file execution permissions.

    OG_KEY="${join("/etc/letsencrypt/live", HOST_ALIAS, basename(SSL_CREDENTIALS.letsencrypt.key))}"
    OG_CERT="${join("/etc/letsencrypt/live", HOST_ALIAS, basename(SSL_CREDENTIALS.letsencrypt.cert))}"
    KEY="${SSL_CREDENTIALS.letsencrypt.key}"
    CERT="${SSL_CREDENTIALS.letsencrypt.cert}"

    if [ -e $OG_KEY ] && [ -e $OG_CERT ]; then
        cp $OG_KEY $KEY
        cp $OG_CERT $CERT
        chmod ${FILE_PERMISSIONS.toString(8)} $KEY
        chmod ${FILE_PERMISSIONS.toString(8)} $CERT
    fi

`)
```

The above example would compile into something like this:<br>
(See how paragraphs have no leading tabs and were joined with an empty line in between them?)

```txt
# Application can not operate on files outside its ownership or realm.
# If Certbot saves certificates at its default --config-dir (/etc/letsencrypt) then copy and give them appropriate file execution permissions.

OG_KEY="${join("/etc/letsencrypt/live", HOST_ALIAS, basename(SSL_CREDENTIALS.letsencrypt.key))}"
OG_CERT="${join("/etc/letsencrypt/live", HOST_ALIAS, basename(SSL_CREDENTIALS.letsencrypt.cert))}"
KEY="${SSL_CREDENTIALS.letsencrypt.key}"
CERT="${SSL_CREDENTIALS.letsencrypt.cert}"

if [ -e $OG_KEY ] && [ -e $OG_CERT ]; then
        cp $OG_KEY $KEY
        cp $OG_CERT $CERT
        chmod ${FILE_PERMISSIONS.toString(8)} $KEY
        chmod ${FILE_PERMISSIONS.toString(8)} $CERT
fi
```

Here's an example with option `oneliner = true`:<br>
(This becomes handy when you generate scripts that are one-liners but for you want readability for the generator code.)

```shell
                openssl
                x509
                -inform PEM
                -in "cert.pem"
                -outform DER
                -out "cert.der"
```
```txt
openssl \
x509 \
-inform PEM \
-in "cert.pem" \
-outform DER \
-out "cert.der"
```
