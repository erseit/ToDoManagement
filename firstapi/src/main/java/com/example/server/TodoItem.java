package com.example.server;
import java.io.Serializable;
import java.util.Random;
import javax.persistence.Entity;
import javax.persistence.Id;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class TodoItem implements Serializable {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @Id
    private String id = this.generateID();
    private String todo;
    private int priority = 2;
    private boolean isClosed = false;
    
    public TodoItem(String todo) {
        this.todo = todo;
    }    
    
    public TodoItem(String todo, int priority) {
        this.todo = todo;
        this.priority = priority;
    }

    public TodoItem(){
        this.id = null;
    };

    public String generateID() {
        int leftLimit = 97;
        int rightLimit = 122;
        int targetStringLength = 12;
        Random random = new Random();
        StringBuilder buffer = new StringBuilder(targetStringLength);
        for (int i = 0; i < targetStringLength; i++) {
            int randomLimitedInt = leftLimit + (int) 
                (random.nextFloat() * (rightLimit - leftLimit + 1));
            buffer.append((char) randomLimitedInt);
        }
        return buffer.toString();
    }

    public String getTodo() {
        return todo;
    }

    public void setTodo(String todo) {
        this.todo = todo;
    }

    public int getPriority() {
        return priority;
    }
    
    public void setPriority(int priority) {
        this.priority = priority;
    }

    public String getID() {
        return id;
    }

    public boolean getIsClosed() {
        return isClosed;
    }

    public void setIsClosed(boolean isClosed) {
        this.isClosed = isClosed;
    }

    @Override
    public String toString() {
        return "TodoItem [id=" + id + ",todo=" + todo + ", priority=" + priority +  ", isClosed=" + isClosed + "]";
    }

    
    
}
