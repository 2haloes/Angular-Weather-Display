<%@ Page Language="C#" %>
<%@ Import Namespace="System.Net" %>
<%@ Import Namespace="System.Net.Http" %>

<!-- This is based on documentation found on the Microsoft website,
I don't have much exprience in this type of thing in C# but it feels too complicated -->
<%
string errorReturn = "{\"currently\": {\"icon\": \"API-ERROR\"}}";

HttpClient client = new HttpClient();
string retval = "";
string queryString = "";
string currentURL = HttpContext.Current.Request.RawUrl;
int queryIndex = currentURL.IndexOf('?');

queryString = currentURL.Substring(queryIndex + 1);
queryString = queryString.replace('_', '&');

HttpResponseMessage response = client.GetAsync(queryString).Result;

try {
  if(response.IsSuccessStatusCode){
  retval = response.Content.ReadAsStringAsync().Result;
  }
}
catch (Exception ex) {
  Response.write(errorReturn);
}
finally {
  Response.write(retval);
}
%>
