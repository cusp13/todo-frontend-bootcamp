// Import animations, React, and icons
import { motion } from "framer-motion"; // For animating UI elements
import React, { useRef } from "react";   // React and useRef hook
import { AiFillEdit } from "react-icons/ai"; // Edit icon
import { IoCheckmarkDoneSharp, IoClose } from "react-icons/io5"; // Done and delete icons

// Functional component to render a single todo item
const TodoItem = ({ item, updateTodo, removeTodo, completeTodo }) => {
    // Create a ref to control the textarea element
    const inputRef = useRef(true); // Initially, the textarea is disabled

    // Function to enable editing on the textarea
    const edit = () => {
        inputRef.current.disabled = false;  // Enable the textarea
        inputRef.current.focus();           // Set focus so user can type immediately
    };

    // Function to handle updating the todo when "Enter" key is pressed
    const update = (e) => {
        if (e.key === "Enter") {
            // Update with correct _id instead of id
            updateTodo({ _id: item._id, item: inputRef.current.value, completed: item.completed });
            inputRef.current.disabled = true; // Disable the input again
        }
    };

    return (
        // Animate the list item when it appears or disappears
        <motion.li
            className="card" // Class for styling each todo card
            initial={{ x: "150vw" }} // Animation starts off-screen to the right
            animate={{ x: 0 }}       // Animates into position
            exit={{ x: "-100vw", opacity: 0 }} // Animates out to the left with fade-out
        >
            {/* Todo text field */}
            <textarea
                ref={inputRef}                // Reference to enable/disable the textarea
                defaultValue={item.item}      // Set initial value from the todo item
                disabled={inputRef}           // Keep it disabled until "edit" is clicked
                onKeyDown={update}            // Listen for Enter key to update the value
            />

            {/* Action buttons: Edit, Complete, Remove */}
            <div className="btns">
                {/* Edit Button */}
                <motion.button whileHover={{ scale: 1.4 }} onClick={edit}>
                    <AiFillEdit />
                </motion.button>

                {/* Complete Button (only shows if not completed yet) */}
                {!item.completed && (
                    <motion.button
                        whileHover={{ scale: 1.4 }}
                        style={{ color: "green" }} // Green for complete
                        onClick={() => completeTodo(item._id)} // Mark as complete
                    >
                        <IoCheckmarkDoneSharp />
                    </motion.button>
                )}

                {/* Delete Button */}
                <motion.button
                    whileHover={{ scale: 1.4 }}
                    style={{ color: "red" }} // Red for delete
                    onClick={() => removeTodo(item._id)} // Remove from list
                >
                    <IoClose />
                </motion.button>
            </div>

            {/* Show "Done" tag if todo is completed */}
            {item.completed && <span className="completed">Done</span>}
        </motion.li>
    );
};

//  Export this component to use in other parts of the app
export default TodoItem;
