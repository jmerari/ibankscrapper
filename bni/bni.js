
var server = 'https://ibank.bni.co.id/directRetail/ibank';

/////////////////////////////////////////////////////////////////////
// In page action 
//

function doParseMenu()
{
    window.bniMenu = {};
    var gotSaldo = false, gotMutasi = false, gotLogout = false;
    var links = document.getElementsByTagName('a');
    for(var i = 0, ii = links.length; i < ii; i++)
    {
        if(links[i].href.search(/\/directRetail\/ibank/g) != -1)
        {
            var label = links[i].innerHTML.replace(/<.*?>/g, '');
            if(label.search(/saldo/i) != -1)
            {
                window.bniMenu.saldo = links[i].href;
                gotSaldo = true;
            }
            else if (label.search(/mutasi/i) != -1)
            {
                window.bniMenu.mutasi = links[i].href;
                gotMutasi = true;
            }
            else if (label.search(/logout/i) != -1)
            {
                window.bniMenu.logout = links[i].href;
                gotLogout = true;
            }
        }
    }
    return gotSaldo && gotMutasi && gotLogout;
}


function doLogin()
{
	document.form_000001.login_name.value = '%username%';
	document.form_000001.password.value = '%password%';
	submitForm();
	document.form_000001.submit();
}

function doLogout()
{
    window.location.href = window.bniMenu.logout;
}

function doClickSaldo()
{
    window.location.href = window.bniMenu.saldo;
}

function doClickMutasi()
{
    window.location.href = window.bniMenu.mutasi;
}

function doRequestMutasi()
{
	document.form_110002.noRekening.value = '%rekening%';
	document.form_110002.submit();
}

function doParseLog()
{
    var logTable = document.getElementsByTagName('table')[5];
    var messages = [];
    var rows = logTable.children[0].children;
    for(var i = 1, ii = rows.length; i < ii; i++)
    {
        var tDate = rows[i].children[1].textContent;
        var tTime = rows[i].children[2].textContent;
        var tActivity = rows[i].children[3].textContent;
        messages.push(tDate + ' ' + tTime + ' ' + tActivity);
    }
    return messages.join('\n');
}

function doParseSaldo()
{
    var trim = function(str)
    {
        var toReturn = str.replace(/\n/g,'').replace(/\t/g,'').replace(/^[ ]+/,'').replace(/[ ]+$/,'');
        return toReturn;
    }
            
    var output = [];
    var logTable = document.getElementsByTagName('table')[8];
    var rows = logTable.children[0].children;
    for(var i = 1, ii = rows.length; i < ii; i++)
    {
        var tNoRekening = trim(rows[i].children[0].textContent);
        var tJenisRekening = trim(rows[i].children[1].textContent);
        var tMataUang = trim(rows[i].children[2].textContent);
        var tSaldo = trim(rows[i].children[3].children[0].children[0].children[0].children[1].textContent);
        output.push(tNoRekening + ' ' + tJenisRekening + ' ' + tMataUang + ' ' + tSaldo);
    }
    return output.join('\n');
}

function doParseMutasi()
{
    var trim = function(str)
    {
        var toReturn = str.replace(/\t/g,'').replace(/\xA0/g,'').replace(/\n/g,'').replace(/^[ ]+/g,'').replace(/[ ]+$/g,'');
        return toReturn;
    }
            
    var output = [];
    var logTable = document.getElementsByTagName('table')[9];
    var rows = logTable.children[0].children;
    for(var i = 1, ii = rows.length; i < ii; i++)
    {
        var tDate = trim(rows[i].children[1].textContent);
        var tDescription = trim(rows[i].children[2].textContent);
        var tCode = trim(rows[i].children[3].textContent);
        var tDebetKredit = trim(rows[i].children[4].textContent);
        var tMutasi = trim(rows[i].children[5].textContent);
        var tSaldo = trim(rows[i].children[6].textContent);
        output.push(tDate + ' ' + tDescription + ' ' + tDebetKredit + ' ' + tMutasi);
    }
    return output.join('\n');
}

