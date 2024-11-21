package com.server;

public class Record{
    Float x;
    Float y;
    Float r;
    Boolean res;
    Boolean p;

    public Record(Float x, Float y, Float r, Boolean res, Boolean p){
        this.x = x;
        this.y = y;
        this.r = r;
        this.res = res;
        this.p = p;
    }

    public Float GetX(){
        return x;
    }

    public Float GetY(){
        return y;
    }

    public Float GetR(){
        return r;
    }

    public Boolean GetRes(){
        return res;
    }

    public Boolean GetP(){
        return p;
    }
 }
