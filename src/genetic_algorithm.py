import random
import numpy as np
from rule import ARCTask, generate_random_task, fitness_function, is_unique_task

# Crossover function to combine two tasks
def crossover(task1, task2):
    size = task1.input_grid.shape[0]
    point = np.random.randint(1, size)
    new_input_grid = np.vstack((task1.input_grid[:point], task2.input_grid[point:]))
    new_output_grid = np.vstack((task1.output_grid[:point], task2.output_grid[point:]))
    return ARCTask(new_input_grid, new_output_grid)

# Mutation function to introduce variations
def mutate(task):
    mutation_chance = 0.2
    if random.random() < mutation_chance:
        i, j = np.random.randint(0, task.input_grid.shape[0], 2)
        task.input_grid[i, j] = np.random.randint(0, 3)
        task.output_grid[i, j] = task.input_grid[i, j] if task.input_grid[i, j] != 1 else 2
    return task

# Genetic Algorithm to generate ARC tasks
def generate_arc_tasks(original_task, population_size=10, generations=20):
    population = []
    while len(population) < population_size:
        new_task = generate_random_task(original_task.input_grid.shape[0])
        if is_unique_task(new_task, population):
            population.append(new_task)
    
    for generation in range(generations):
        population = sorted(population, key=lambda task: fitness_function(original_task, task), reverse=True)
        
        # Select the top 50% of the population for breeding
        breeding_pool = population[:population_size // 2]
        
        # Generate new population through crossover and mutation
        new_population = []
        while len(new_population) < population_size:
            parent1, parent2 = random.sample(breeding_pool, 2)
            child = crossover(parent1, parent2)
            child = mutate(child)
            if is_unique_task(child, new_population):
                new_population.append(child)
        
        population = new_population
    
    return population[:10]  # Return the top 10 unique tasks
