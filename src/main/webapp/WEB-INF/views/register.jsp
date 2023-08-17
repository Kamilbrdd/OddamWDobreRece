<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ include file="header.jsp"%>
</header>

</header>

<section class="login-page">
    <h2>Załóż konto</h2>
<form:form modelAttribute="user" method="post" action="/register">
        <div class="form-group">
            <form:input path="username" class="form-control" placeholder="podaj login" />
        </div>
        <div class="form-group">
            <form:input path="password" class="form-control" placeholder="podaj hasło" />
        </div>

        <div class="form-group form-group--buttons">
            <a href="login.html" class="btn btn--without-border">Zaloguj się</a>
            <button class="btn" type="submit">Załóż konto</button>
            </form:form>>
        </div>

</section>

<%@ include file="footer.jsp"%>
<script src="<c:url value="resources/js/app.js"/>"></script>
</body>
</html>