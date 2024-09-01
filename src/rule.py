import numpy as np

# Define the ARC task structure
class ARCTask:
    def __init__(self, input_grid, output_grid):
        self.input_grid = input_grid
        self.output_grid = output_grid

# Generate an initial random task
def generate_random_task(size):
    input_grid = np.random.randint(0, 3, size=(size, size))
    output_grid = input_grid.copy()
    output_grid[output_grid == 1] = 2
    return ARCTask(input_grid, output_grid)

# Fitness function to evaluate how well a generated task matches the original task's rule
def fitness_function(original_task, generated_task):
    original_diff = original_task.output_grid - original_task.input_grid
    generated_diff = generated_task.output_grid - generated_task.input_grid
    fitness = np.sum(original_diff == generated_diff)
    return fitness

# Ensure tasks are unique by checking input-output pairs
def is_unique_task(task, task_list):
    for t in task_list:
        if np.array_equal(task.input_grid, t.input_grid) and np.array_equal(task.output_grid, t.output_grid):
            return False
    return True
