<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:useBean id="user" class="com.server.User" scope="session" />
<jsp:useBean id="error" class="com.server.Error" scope="session" />

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Second Lab</title>
    <link rel="icon" href="https://se.ifmo.ru/o/helios-theme/images/favicon.ico">
    <link rel="stylesheet" type="text/css" href="static/css/style.css" media="screen">
    <link rel="stylesheet" type="text/css" href="static/css/new.css" media="screen">
</head>

<body><table width="100%">
    <thead>
        <tr>
            <!-- (sans-serif), его цвет и размер в каскадной таблице стилей. -->
            <th id="header">
                <p>Капарулин Тимофей Иванович<br>
                P3208<br>
                Вариант 41979</p>
            </th>
        </tr>
    </thead>

    <tbody>
        <colgroup>
            <col width="20%"></col>
            <col width="80%"></col>
        </colgroup>
        <tr>
            <td>          
            </td>
            <td><canvas id='graph' width="320px" height="320px"></canvas></td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td style="border: 0;">
            </td>
            <td>
                <table  width="100%">
                    <tr>
                      <th width="55%"></th>
                      <th width="45%">Результаты</th>
                    </tr>
                    <tr>
                        <th><button class="back-to-root" onclick="window.location.href='/index'">Вернуться</button></th>
                        <th>
                            <% if (error.getError() == null) { %>        
                            <table id="result-table">
                            <tr>
                                <th>x</th>
                                <th>y</th>
                                <th>r</th>
                                <th>result</th>
                            </tr>

                                <tr>
                                    <th>${user.getRecord().getLast().GetX()}</th>
                                    <th>${user.getRecord().getLast().GetY()}</th>
                                    <th>${user.getRecord().getLast().GetR()}</th>
                                    <th>${user.getRecord().getLast().GetRes() ? "<span style='color:rgb(25, 212, 25)'>Попадание</span>" : "<span style='color:rgb(255, 6, 6)'>Промах</span>"}</th>
                                </tr>

                            </table>
                            <%} else { %> 
                                <p id="error">${error.getError()}</p>
                            <% } %>
                        </th>
                    </tr>
                </table>
            </td>
        </tr>

    </tfoot>
</table>

</body>
<script src="static/js/result.js"></script>
<script>
    <c:forEach var="item" items="${user.getRecord()}">
        <c:if test="${item.GetP()}">

            ctx.beginPath();
            ctx.arc(${item.GetX()}*R + centerX, -1*${item.GetY()}*R + centerY, 2, 0, 2 * Math.PI);
            <c:choose>
                <c:when test="${item.GetRes()}">
                    ctx.fillStyle = 'green';
                </c:when>
                <c:otherwise>
                    ctx.fillStyle = 'red';
                </c:otherwise>
            </c:choose>
            ctx.fill();

        </c:if>
    </c:forEach>
</script>
</html>