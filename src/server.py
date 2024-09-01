from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.colors as colors
import io
import base64
from genetic_algorithm import generate_arc_tasks
from rule import ARCTask

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

# Visualization functions
def plot_one(matrix, title):
    cmap = colors.ListedColormap(
        ['#000000', '#0074D9','#FF4136','#2ECC40','#FFDC00',
         '#AAAAAA', '#F012BE', '#FF851B', '#7FDBFF', '#870C25'])
    norm = colors.Normalize(vmin=0, vmax=9)
    
    fig, ax = plt.subplots(figsize=(3, 3))
    ax.imshow(matrix, cmap=cmap, norm=norm)
    ax.grid(True, which='both', color='lightgrey', linewidth=0.5)
    ax.set_yticks([x-0.5 for x in range(1+len(matrix))])
    ax.set_xticks([x-0.5 for x in range(1+len(matrix[0]))])
    ax.set_xticklabels([])
    ax.set_yticklabels([])
    ax.set_title(title)
    
    # Save plot to a PNG in memory
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    plt.close(fig)
    
    # Encode PNG to base64
    return base64.b64encode(buf.read()).decode('utf-8')

def plot_arc_task(original_task, generated_task):
    original_input_img = plot_one(original_task.input_grid, 'Original Input Grid')
    original_output_img = plot_one(original_task.output_grid, 'Original Output Grid')
    generated_input_img = plot_one(generated_task.input_grid, 'Generated Input Grid')
    generated_output_img = plot_one(generated_task.output_grid, 'Generated Output Grid')
    
    return {
        "original_input": original_input_img,
        "original_output": original_output_img,
        "generated_input": generated_input_img,
        "generated_output": generated_output_img
    }

@app.route('/generate-ttasks', methods=['POST'])
def generate_tasks_api():
    data = request.get_json()
    input_grid = np.array(data['inputGrid'])
    output_grid = np.array(data['outputGrid'])

    # Create the original task from user input
    original_task = ARCTask(input_grid, output_grid)
    
    # Generate new tasks using the genetic algorithm
    generated_tasks = generate_arc_tasks(original_task)
    
    tasks = []
    for task in generated_tasks:
        task_images = plot_arc_task(original_task, task)
        tasks.append({
            'input_grid': task.input_grid.tolist(),
            'output_grid': task.output_grid.tolist(),
            'images': task_images
        })
    
    return jsonify({"tasks": tasks})

if __name__ == '__main__':
    app.run(debug=True)
