<%@ Page Language="C#" %>
<%@ Import Namespace="System.Net" %>


<%
    string errorReturn = "{\"currently\": {\"icon\": \"API-ERROR\"}}";

    string retval = "";
    string queryString = "";
    string currentURL = HttpContext.Current.Request.RawUrl;
    int queryIndex = currentURL.IndexOf('?');

    queryString = currentURL.Substring(queryIndex + 1);
    queryString = queryString.Replace('_', '&');

    Response.Clear();
    Response.ContentType = "application/json; charset=utf-8";

    try {
        retval = new WebClient().DownloadString(queryString);
    }
    catch (Exception ex) {
        Response.Write(errorReturn);
    }
    finally {
        Response.Write(retval);
    }
%>
