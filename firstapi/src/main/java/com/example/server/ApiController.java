package com.example.server;

import java.util.Iterator;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

// CRUD Controller class
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/todos")
public class ApiController {

    @Autowired
    TodoItemRepository todoItemRepository;

    public TodoItem findItemWithName(List<TodoItem> items, String todo) {
        Iterator<TodoItem> i = items.iterator();
        while (i.hasNext()) {
            TodoItem template = i.next();
            if (template.getTodo().equalsIgnoreCase(todo) && !template.getIsClosed()) {
                return template;
            }
        }
        return new TodoItem();
    }

    @Operation(summary = "Returns the version number.")
    @GetMapping("/version")
    public String getVersion() {
        return "v2";
    }

    // Add new item to list with path variables
    @Operation(summary = "Creates a ToDo Item.", description = "## Creates a ToDo with path variable name." + "\n\n"
            + "ToDo's priority is set by default to 2. You can change it later")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Item has been created", content = @Content),
            @ApiResponse(responseCode = "403", description = "There is already a ToDo with this name!Change the name and try again", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Sever Error", content = @Content),
    })
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/{name}")
    public ResponseEntity<TodoItem> createAndAddItem(
            @PathVariable @Parameter(name = "name", description = "Give the name of todo.") String name) {
        try {
            List<TodoItem> allItems = todoItemRepository.findAll();
            TodoItem newItem = new TodoItem(name);
            TodoItem existingItem = findItemWithName(allItems, name);
            if (existingItem.getID() == null) {
                todoItemRepository.save(newItem);
                return new ResponseEntity<TodoItem>(newItem, HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Add new item to list with a JSON object
    @Operation(summary = "Creates a ToDo Item.", description = "## Creates a ToDo with a JSON Object" + "\n\n" +
            "ToDo's name must not be **empty** or default value **\"string\"**" + "\n\n" +
            "isClosed attribute must be **false**" + "\n\n" +
            "Priority should be **selected with this classification numbers:**" + "\n\n" +
            "- **1** - Urgency level: Highest" + "\n\n" +
            "- **2** - Urgency level: Higher" + "\n\n" +
            "- **3** - Urgency level: Low" + "\n\n" +
            "- **4** - Urgency level: Lower" + "\n\n" +
            "- **5** - Urgency level: Lowest" + "\n\n")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Item has been created", content = @Content),
            @ApiResponse(responseCode = "400", description = "Item couldn\'t created.Check your input values!", content = @Content),
            @ApiResponse(responseCode = "403", description = "There is already a ToDo with this name!Change the name and try again", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Sever Error", content = @Content),
    })
    @PostMapping("/")
    public ResponseEntity<TodoItem> addItem(@RequestBody TodoItem item) {
        try {
            List<TodoItem> allItems = todoItemRepository.findAll();
            if (item.getTodo().length() == 0 || item.getTodo().equalsIgnoreCase("string") || item.getPriority() < 1
                    || item.getPriority() > 5) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            } else {
                TodoItem requestedItem = findItemWithName(allItems, item.getTodo());
                if (requestedItem.getID() == null) {
                    TodoItem newItem = new TodoItem(item.getTodo(), item.getPriority());
                    todoItemRepository.save(newItem);
                    return new ResponseEntity<TodoItem>(newItem, HttpStatus.CREATED);
                } else {
                    return new ResponseEntity<>(HttpStatus.FORBIDDEN);
                }
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update an item with id and JSON
    @Operation(summary = "Updates a ToDo Item.", description = "## Updates a ToDo with a JSON Object." + "\n\n" +
            "If the ToDo is done, isClosed attribute should be **true**, default is **false**" + "\n\n" +
            "It updates the name attribute if the new name is not **empty** or default value **\"string\"**" + "\n\n" +
            "It updates the priority attribute if the new priority is be **selected with this classification numbers:**"
            + "\n\n" +
            "- **1** - Urgency level: Highest" + "\n\n" +
            "- **2** - Urgency level: Higher" + "\n\n" +
            "- **3** - Urgency level: Low" + "\n\n" +
            "- **4** - Urgency level: Lower" + "\n\n" +
            "- **5** - Urgency level: Lowest" + "\n\n")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Item updated successfully", content = @Content),
            @ApiResponse(responseCode = "403", description = "There is already a ToDo with this name!Change the name and try again", content = @Content),
            @ApiResponse(responseCode = "404", description = "Item not found!", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Sever Error", content = @Content),
    })
    @PutMapping("/{id}")
    public ResponseEntity<TodoItem> updateItem(@PathVariable String id, @RequestBody(required = false) TodoItem item) {
        try {
            List<TodoItem> allItems = todoItemRepository.findAll();
            TodoItem existingItem = todoItemRepository.findById(id).get();
            if (existingItem.getID() == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                TodoItem existingTodo = findItemWithName(allItems, item.getTodo());

                if(existingTodo.getID() != null && (existingTodo.getID() != existingItem.getID())) {
                    return new ResponseEntity<>(HttpStatus.FORBIDDEN);
                }

                if (item.getTodo().length() > 0 && !item.getTodo().equalsIgnoreCase("string") && (existingTodo.getID() == null)) {
                    existingItem.setTodo(item.getTodo());
                }
                if (item.getPriority() > 0 && item.getPriority() < 6) {
                    existingItem.setPriority(item.getPriority());
                }
                if (item.getIsClosed()) {
                    existingItem.setIsClosed(item.getIsClosed());
                }
                return new ResponseEntity<TodoItem>(existingItem, HttpStatus.OK);

            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Delete an item from the list with items id as path variable
    @Operation(summary = "Deletes a ToDo Item.", description = "## Deletes a ToDo with ToDo's id as parameter")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Item deleted successfully", content = @Content),
            @ApiResponse(responseCode = "404", description = "Item not found!", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Sever Error", content = @Content),
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable String id) {
        try {
            TodoItem existingItem = todoItemRepository.findById(id).get();
            if (existingItem.getID() == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                todoItemRepository.delete(existingItem);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // List all elements in ArrayList
    @Operation(summary = "Returns all ToDo Items.")
    @GetMapping(value = "/", produces = "application/json")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List all items", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Sever Error", content = @Content),
    })
    public ResponseEntity<List<TodoItem>> getItems() {
        try {
            List<TodoItem> allItems = todoItemRepository.findAll();
            return new ResponseEntity<List<TodoItem>>(allItems, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
