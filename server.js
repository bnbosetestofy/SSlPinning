//const express = require('express'); 
const os = require('os');
//const app = express();              
//const port = 5000;                  


/*app.get('/', (req, res) => {        
    //res.sendFile('index.html', {root: __dirname});    
    res.send('Hello World!');  
                                                       
});*/


console.log(os.platform());

if (os.platform() == 'win32') {  
    if (os.arch() == 'ia32') {
        var chilkat = require('@chilkat/ck-node11-win-ia32');
    } else {
        var chilkat = require('@chilkat/ck-node11-win64'); 
    }
} else if (os.platform() == 'linux') {
    if (os.arch() == 'arm') {
        var chilkat = require('@chilkat/ck-node11-arm');
    } else if (os.arch() == 'x86') {
        var chilkat = require('@chilkat/ck-node11-linux32');
    } else {
        var chilkat = require('@chilkat/ck-node16-linux64');
    }
} else if (os.platform() == 'darwin') {
    var chilkat = require('@chilkat/ck-node11-macosx');
}

function chilkatExample() {

    // This example requires the Chilkat API to have been previously unlocked.
    // See Global Unlock Sample for sample code.

    var httpA = new chilkat.Http();

    // To do public key pinning, the SPKI fingerprint would be obtained beforehand -- perhaps
    // at design time, or possibly at the time of the 1st connection (where the SPKI fingerprint
    // is persisted for future use).  Note:  "If the certificate or public key is added upon first
    // encounter, you will be using key continuity. Key continuity can fail if the attacker has a 
    // privileged position during the first first encounter." 
    // See https://www.owasp.org/index.php/Certificate_and_Public_Key_Pinning
    // sslCert: Cert
    var sslCert = httpA.GetServerSslCert("www.sonyliv.com",443);
    if (httpA.LastMethodSuccess == false) {
        console.log(httpA.LastErrorText);
        return;
    }

    // The GetSpkiFingerprint method returns the SPKI Fingerprint suitable for use in pinning.
    console.log("SPKI Fingerprint: " + sslCert.GetSpkiFingerprint("sha256","base64"));

    // ------------------------------------------------------------------------------------

    // At the time of writing this example (on 19-Dec-2015) the sha256/base64 SPKI fingerprint
    // for the ssllabs.com server certificate is: xkWf9Qfs1uZi2NcMV3Gdnrz1UF4FNAslzApMTwynaMU=

    var httpB = new chilkat.Http();

    // Set the TlsPinSet.  The format of the TlsPinSet string is:
    //  "hashAlg, encoding, fingerprint1, fingerprint2, ..."
    //httpB.TlsPinSet = "sha256, base64, xkWf9Qfs1uZi2NcMV3Gdnrz1UF4FNAslzApMTwynaMU=";

    httpB.TlsPinSet = "sha256, base64, FI3VUkf7IOzGNRcf/ac5MwYD0eYwD9Vn5BnqXySQvB8";

    // Our object will refuse to communicate with any TLS server where the server's public key
    // does not match a pin in the pinset.

    // This should be OK (assuming the ssllabs.com server certificate has not changed since
    // the time of writing this example).
    var html = httpB.QuickGetStr("https://www.sonyliv.com/");
    if (httpB.LastMethodSuccess == false) {
        console.log(httpB.LastErrorText);
        return;
    }

    console.log("Success.  The HTTP GET worked because the server's certificate had a matching public key.");

    // This should NOT be OK because owasp.org's server certificate will not have a matching public key.
   /* html = httpB.QuickGetStr("https://www.owasp.org/index.php/Certificate_and_Public_Key_Pinning");
    if (httpB.LastMethodSuccess == false) {
        console.log("Good, this connection was rejected...");
    }
    else {
        console.log("This was not supposed to happen!");
        return;
    }*/


}

chilkatExample();















/*app.listen(port, () => {            
    console.log(`Now listening on port ${port}`); 
});*/