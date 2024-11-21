package com.server;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.server.User;
import com.server.Record;
import com.server.Error;

public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (req.getParameter("x") != null && req.getParameter("y") != null && req.getParameter("r") != null && req.getSession().getAttribute("user") != null) {
            User user = (User) req.getSession().getAttribute("user");
            
            Error error = (Error) req.getSession().getAttribute("error");

            try{
                float x = Float.parseFloat(req.getParameter("x"));
                float y = Float.parseFloat(req.getParameter("y"));
                float r = Float.parseFloat(req.getParameter("r"));

                // если ошибки нет, иначе она задается в validate 
                if(validate(x,y,r,error)){
                    Boolean p = false;
                    if(req.getParameter("p") != null){ p = true; }

                    boolean check = checkArea(x,y,r);

                    user.addRow(new Record(x, y, r, check, p));
                    error.setError(null);
                }
            }catch(NumberFormatException e){
                error.setError("Передано значение не соответствующее типу одного из параметров");
            }
        }

        req.getRequestDispatcher("result.jsp").forward(req, resp);

    }

    protected boolean validate(float x, float y, float r, Error error){
        if(!(-3 <= x && x <= 5)){
            error.setError("Неверное числовое значение для x");
            return false;   
        }

        if(!(1 <= r && r <= 5)){
            error.setError("Неверное числовое значение для r");  
            return false; 
        }

        if(!(-3 <= y && y <= 5)){
            error.setError("Неверное числовое значение для y"); 
            return false;       
        }

        return true;
    }

    protected boolean checkArea(float x, float y, float r){
        if((x<-r) || (x>r) || (y<-r) || (y>r)){

            return false;

        }else if((x<0) && (y>0)){

            return false;

        }else if((x>0) && (y>0)) {

            return x*x + y*y <= r*r;

        }else if((x<0) && (y<0)) {

            return (x+y)>=-r;

        }

        return true;
    }
}