-- Task 4 that creates a trigger that decreases the quanity of
-- an item after adding a new order.
-- Quanity in the table items can be negative
DELIMITER //

CREATE TRIGGER after_order_decrease
AFTER INSERT ON orders
FOR EACH ROW
BEGIN
    UPDATE items
    SET quantity = quantity - NEW.number
    WHERE name = NEW.item_name;
END;
//

DELIMITER ;
