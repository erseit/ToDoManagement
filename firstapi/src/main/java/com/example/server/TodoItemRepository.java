package com.example.server;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoItemRepository extends JpaRepository<TodoItem, String>{
    TodoItem findByTodo(String todo);
}