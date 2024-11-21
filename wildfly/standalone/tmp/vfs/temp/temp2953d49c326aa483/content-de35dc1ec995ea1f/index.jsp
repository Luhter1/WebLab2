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
                <form action="/index" method="get" id="data">

                    <label for="radio">Выберите X:</label><br>
                    <label for="-3">
                        <input type="radio" id="-3" name="x" value="-3" required> 
                        -3
                    </label>
                    <label for="0">
                        <input type="radio" id="0" name="x" value="0">
                        0
                    </label>
                    <label for="3">
                        <input type="radio" id="3" name="x" value="3">
                        3
                    </label><br>
                    <label for="-2">
                        <input type="radio" id="-2" name="x" value="-2"> 
                        -2
                    </label>
                    <label for="1">
                        <input type="radio" id="1" name="x" value="1">
                        1
                    </label>
                    <label for="4">
                        <input type="radio" id="4" name="x" value="4">
                        4
                    </label><br>
                    <label for="-1">
                        <input type="radio" id="-1" name="x" value="-1"> 
                        -1
                    </label>
                    <label for="2">
                        <input type="radio" id="2" name="x" value="2">
                        2
                    </label>
                    <label for="5">
                        <input type="radio" id="5" name="x" value="5">
                        5
                    </label><br><br>

                    <label for="y">Введите Y:</label>
                    <input type="number" step="0.01" min="-3" max="5" required id="y" name="y"><br><br>


                    <label for="r">Выберите R:</label>
                    <select id="r" name="r" required>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select><br><br>

                    <button type="submit">Отправить</button>
                </form>
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
                        <th><p id="error" hidden></p></th>
                        <th>        
                            <table id="result-table">
                            <tr>
                                <th>x</th>
                                <th>y</th>
                                <th>r</th>
                                <th>result</th>
                            </tr>
                            <c:forEach var="item" items="${user.getRecord()}">
                                <tr>
                                    <th>${item.GetX()}</th>
                                    <th>${item.GetY()}</th>
                                    <th>${item.GetR()}</th>
                                    <th>${item.GetRes() ? "<span style='color:rgb(25, 212, 25)'>Попадание</span>" : "<span style='color:rgb(255, 6, 6)'>Промах</span>"}</th>
                                </tr>
                            </c:forEach>
                            </table>
                        </th>
                    </tr>
                </table>
            </td>
        </tr>

    </tfoot>
</table>

</body>
<script src="static/js/index.js"></script>
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