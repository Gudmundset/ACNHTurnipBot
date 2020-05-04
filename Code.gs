function postMessageToDiscord(message) {
  
  // Exit if not on active sheet
  var activeSheet = message.source.getActiveSheet();
  if (activeSheet.getName() !== "Friend Codes") return;
  
  // Exit if we're out of range
  // Edit this to only grab the column you want. We keep it G.
  var editRange = { // G3:G999
    top : 3,
    bottom : 999,
    left : 7,
    right : 7
  };

  var thisRow = message.range.getRow();
  if (thisRow < editRange.top || thisRow > editRange.bottom) return;

  var thisCol = message.range.getColumn();
  if (thisCol < editRange.left || thisCol > editRange.right) return;
  
  if (message.value) {
    // Edit this or comment this with the name columns.
    var range = activeSheet.getRange("A1:B99");
    var user = range.getCell(thisRow, 2);
    var realname = range.getCell(thisRow, 1);
    
    if (user.getValue() == realname.getValue()) { var username = user.getValue() }
    else { var username = user.getValue() + "(" + realname.getValue() + ")"; }
    var price = message.value;
    var sentence = username + " has a turnip price of "
    var result = sentence + price
    Logger.log(result)
    
    // Enter your discord webhook here
    var discordUrl = '';
    var payload = JSON.stringify({content: result});
    
    var params = {
      headers: {
        'Content-Type': 'application/json'
      },
      content: result,
      method: "POST",
      muteHttpExceptions: true
    };
    
    var response = UrlFetchApp.fetch(discordUrl, params);
    Logger.log(response.getContentText());
  }

}

