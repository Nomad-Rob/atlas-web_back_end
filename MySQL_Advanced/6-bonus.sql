-- Task 6 creates a stored procedure AddBonus that a new correction ofr a student
-- AddBonus is taking 3 inputs in order: user_id, project_name, score
-- user_id is the id of the user that will receive the bonus
-- project_name is the name of the project that the user has submitted
-- score the score value for the correction
DELIMITER //

CREATE PROCEDURE AddBonus(IN user_id INT, IN project_name VARCHAR(255), IN score INT)
BEGIN
    DECLARE project_id INT;

    -- Check if the project already exists
    SELECT id INTO project_id FROM projects WHERE name = project_name;

    -- If the project does not exist, create it
    IF project_id IS NULL THEN
        INSERT INTO projects (name) VALUES (project_name);
        SET project_id = LAST_INSERT_ID();
    END IF;

    -- Insert the correction
    INSERT INTO corrections (user_id, project_id, score) VALUES (user_id, project_id, score);
END //

DELIMITER ;
