package com.server;

import java.util.LinkedList;

import com.server.Record;


public class User {
    private LinkedList<Record> recs;

    public User() {
        recs = new LinkedList<Record>();
    }

    public LinkedList<Record> getRecord() {
        return recs;
    }

    public void setRecord(LinkedList<Record> recs) {
        this.recs = recs;
    }

    public void addRow(Record rec) {
        this.recs.add(rec);
    }
}