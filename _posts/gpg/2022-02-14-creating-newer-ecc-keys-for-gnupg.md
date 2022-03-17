---
title: "Creating newer ECC keys for GnuPG"
header:
  teaser: /assets/images/creating-newer-ecc-keys-for-gnupg/creating-newer-ecc-keys-for-gnupg.png
  og_image: /assets/images/creating-newer-ecc-keys-for-gnupg/creating-newer-ecc-keys-for-gnupg.png
categories:
  - GnuPG
tags: 
  - git
  - gpg
  - gpg-key
toc: true
toc_sticky: true
---

Here is an explanation of how to create your new ECC keys for GnuPG.

GnuPG 2.1.x supports ECC (Elliptic Curve Cryptography). ECC is generic term and security of ECC depends on the curve used. Unfortunately, no one wants to use standardized curve of NIST.

{% include figure image_path="/assets/images/creating-newer-ecc-keys-for-gnupg/creating-newer-ecc-keys-for-gnupg.png" alt="Creating newer ECC keys for GnuPG header image" %}

Since GnuPG 2.1.0, we can use Ed25519 for digital signing. Although it is not yet standardized in OpenPGP WG, it's considered safer.

Ed25519 was introduced to OpenSSH already, so, we can use ssh-agent feature of gpg-agent using authentication subkey of OpenPGP. However, there was no encryption support for corresponding curve.

Since GnuPG 2.1.7 of August 2015, encryption by Curve25519 is supported. It is pretty much experimental, because it requires development version of libgcrypt (and not standardized yet).

Anyhow, here is the how to.

## Preparation

- Development version of libgcrypt: git.gnupg.org  
  You need to clone the master branch and build and install it by yourself (from source). Here, we assume that it's installed in /usr/local.

- GnuPG 2.1.7 or later  
  In Debian experimental, we have gnupg2 package.

## Example session log

Here is an example session log to create newer ECC keys for GnuPG.

At first, we should have LD_LIBRARY_PATH defined. And it is better to kill existing gpg-agent because it doesn't run with LD_LIBRARY_PATH defined.

```
$ export LD_LIBRARY_PATH=/usr/local/lib
$ gpg-connect-agent KILLAGENT /bye
OK closing connection
```

Next, we invoke gpg frontend with `--expert` and `--full-gen-key` option.
```
$ gpg2 --expert --full-gen-key
gpg (GnuPG) 2.1.8; Copyright (C) 2015 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
```

Then, we input `9` to select ECC primary key and ECC encryption subkey.
```
Please select what kind of key you want:
   (1) RSA and RSA (default)
   (2) DSA and Elgamal
   (3) DSA (sign only)
   (4) RSA (sign only)
   (7) DSA (set your own capabilities)
   (8) RSA (set your own capabilities)
   (9) ECC and ECC
  (10) ECC (sign only)
  (11) ECC (set your own capabilities)
Your selection? 9
```

Next is the important selection. We input 1 to select "Curve25519".
```
Please select which elliptic curve you want:
   (1) Curve 25519
   (2) NIST P-256
   (3) NIST P-384
   (4) NIST P-521
   (5) Brainpool P-256
   (6) Brainpool P-384
   (7) Brainpool P-512
   (8) secp256k1
Your selection? 1
```

You'll see WARNING, but it is what you want.
```
gpg: WARNING: Curve25519 is not yet part of the OpenPGP standard.
Use this curve anyway? (y/N) y
```

It asks about expiration of key.
```
Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
Key is valid for? (0)
Key does not expire at all
Is this correct? (y/N) y
```

Then, it asks about a user ID.
```
GnuPG needs to construct a user ID to identify your key.

Real name: Kunisada Chuji
Email address: chuji@gniibe.org
Comment:
You selected this USER-ID:
    "Kunisada Chuji <chuji@gniibe.org>"
```

Lastly, it asks confirmation.
```
Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? o
```

Then, it goes like this.
```
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
```

It asks the passphrase for keys by pop-up window, and then, finishes.
```
gpg: key 7C406DB5 marked as ultimately trusted
public and secret key created and signed.

gpg: checking the trustdb
gpg: 3 marginal(s) needed, 1 complete(s) needed, PGP trust model
gpg: depth: 0  valid:   6  signed:  67  trust: 0-, 0q, 0n, 0m, 0f, 6u
gpg: depth: 1  valid:  67  signed:  40  trust: 67-, 0q, 0n, 0m, 0f, 0u
gpg: next trustdb check due at 2015-12-05
pub   ed25519/7C406DB5 2015-09-11
      Key fingerprint = 608C 9215 646A D2C5 551B  320B 1717 4C1A 7C40 6DB5
uid         [ultimate] Kunisada Chuji <chuji@gniibe.org>
sub   cv25519/DF7B31B1 2015-09-11

$
```

`ed25519/7C406DB5` is the primary key, and `cv25519/DF7B31B1` is encryption subkey.

Next, we add authentication subkey which can be used with OpenSSH. We invoke gpg frontend with `--edit-key` and the key ID.
```
$ gpg2 --expert --edit-key 7C406DB5
gpg (GnuPG) 2.1.8; Copyright (C) 2015 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Secret key is available.

sec  ed25519/7C406DB5
     created: 2015-09-11  expires: never       usage: SC
     trust: ultimate      validity: ultimate
ssb  cv25519/DF7B31B1
     created: 2015-09-11  expires: never       usage: E
[ultimate] (1). Kunisada Chuji <chuji@gniibe.org>
```

We invoke `addkey` subcommand.
```
gpg> addkey
```

It asks a kind of key, we input 11 to select ECC for authentication.
```
Please select what kind of key you want:
   (3) DSA (sign only)
   (4) RSA (sign only)
   (5) Elgamal (encrypt only)
   (6) RSA (encrypt only)
   (7) DSA (set your own capabilities)
   (8) RSA (set your own capabilities)
  (10) ECC (sign only)
  (11) ECC (set your own capabilities)
  (12) ECC (encrypt only)
  (13) Existing key
Your selection? 11
```

and then, we specify "Authenticate" capability.
```
Possible actions for a ECDSA key: Sign Authenticate
Current allowed actions: Sign

   (S) Toggle the sign capability
   (A) Toggle the authenticate capability
   (Q) Finished

Your selection? a

Possible actions for a ECDSA key: Sign Authenticate
Current allowed actions: Sign Authenticate

   (S) Toggle the sign capability
   (A) Toggle the authenticate capability
   (Q) Finished

Your selection? s

Possible actions for a ECDSA key: Sign Authenticate
Current allowed actions: Authenticate

   (S) Toggle the sign capability
   (A) Toggle the authenticate capability
   (Q) Finished

Your selection? q
```

Then, it asks which curve. We input 1 for "Curve25519".
```
Please select which elliptic curve you want:
   (1) Curve 25519
   (2) NIST P-256
   (3) NIST P-384
   (4) NIST P-521
   (5) Brainpool P-256
   (6) Brainpool P-384
   (7) Brainpool P-512
   (8) secp256k1
Your selection? 1
```

It asks confirmation. We say y.
```
gpg: WARNING: Curve25519 is not yet part of the OpenPGP standard.
Use this curve anyway? (y/N) y
```

It asks expiration of the key.
```
Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
Key is valid for? (0)
Key does not expire at all
Is this correct? (y/N) y
```

And the confirmation.
```
Really create? (y/N) y
```

It goes.
```
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
```
It asks the passphrase. And done.
```
sec  ed25519/7C406DB5
     created: 2015-09-11  expires: never       usage: SC
     trust: ultimate      validity: ultimate
ssb  cv25519/DF7B31B1
     created: 2015-09-11  expires: never       usage: E
ssb  ed25519/8679DF5F
     created: 2015-09-11  expires: never       usage: A
[ultimate] (1). Kunisada Chuji <chuji@gniibe.org>
```

We type `save` to exit form gpg.
```
gpg> save
$
```

Use the gpg `--list-secret-keys --keyid-format LONG` command to list GPG keys for which you have both a public and private key. A private key is required for signing commits or tags.

```
$ gpg --list-secret-keys --keyid-format LONG
``` 

> **Note:** Some GPG installations on Linux may require you to use `gpg2 --list-keys --keyid-format LONG` to view a list of your existing keys instead. In this case you will also need to configure Git to use gpg2 by running `git config --global gpg.program gpg2`.

From the list of GPG keys, copy the GPG key ID you'd like to use. In this example, the GPG key ID is `3AA5C34371567BD2`:

```
$ gpg --list-secret-keys --keyid-format LONG
/Users/hubot/.gnupg/secring.gpg
------------------------------------
sec   4096R/3AA5C34371567BD2 2016-03-10 [expires: 2017-03-10]
uid                          Hubot 
ssb   4096R/42B317FD4BA89E7A 2016-03-10
```
Paste the text below, substituting in the GPG key ID you'd like to use. In this example, the GPG key ID is `3AA5C34371567BD2`:

```
$ gpg --armor --export 3AA5C34371567BD2
# Prints the GPG key ID, in ASCII armor format
```
Copy your GPG key, beginning with `-----BEGIN PGP PUBLIC KEY BLOCK-----` and ending with `-----END PGP PUBLIC KEY BLOCK-----`
