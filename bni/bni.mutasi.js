phantom.injectJs('casper.js');
phantom.injectJs('config.js');
phantom.injectJs('bni.js');


var page = new WebPage();
page.settings = {loadImages:false};
page.onConsoleMessage = function(msg){console.log(msg);};
var casper = new phantom.Casper({verbose:true, page:page, onError:function(self, er){self.echo(er);self.exit();}});

/////////////////////////////////////////////////////////////////////
// Scenario 
//

casper.start(server).then(function(self)
{
    self.echo('login...');
    self.evaluate(doLogin,{username:username,password:password});
}).then(function(self)
{
    self.evaluateOrDie(doParseMenu,'Silakan mencoba beberapa saat lagi');
    self.echo('click mutasi...');
    self.evaluate(doClickMutasi);
}).then(function(self)
{
    self.echo('request mutasi...');
    self.evaluate(doRequestMutasi,{rekening:rekening});
}).then(function(self)
{
    self.evaluateOrDie(doParseMenu,'Logged out from server');
    self.echo('parse mutasi...');
    self.echo(self.evaluate(doParseMutasi));
    self.echo('logout...');
    self.evaluate(doLogout);
}).then(function(self)
{
    self.echo('parse log...');
    self.echo(self.evaluate(doParseLog));
}).run(function(self)
{
    self.exit();
});

