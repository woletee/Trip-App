import matplotlib.pyplot as plt
import matplotlib.colors as colors

# Visualization function to plot a single grid
def plot_one(ax, matrix, title):
    cmap = colors.ListedColormap(
        ['#000000', '#0074D9', '#FF4136', '#2ECC40', '#FFDC00',
         '#AAAAAA', '#F012BE', '#FF851B', '#7FDBFF', '#870C25'])
    norm = colors.Normalize(vmin=0, vmax=9)
    
    ax.imshow(matrix, cmap=cmap, norm=norm)
    ax.grid(True, which='both', color='lightgrey', linewidth=0.5)
    ax.set_yticks([x-0.5 for x in range(1+len(matrix))])
    ax.set_xticks([x-0.5 for x in range(1+len(matrix[0]))])
    ax.set_xticklabels([])
    ax.set_yticklabels([])
    ax.set_title(title)

# Function to visualize the original and generated tasks
def plot_arc_task(original_task, generated_task):
    fig, axs = plt.subplots(2, 2, figsize=(9, 6))
    
    plot_one(axs[0, 0], original_task.input_grid, 'Original Input Grid')
    plot_one(axs[0, 1], original_task.output_grid, 'Original Output Grid')
    plot_one(axs[1, 0], generated_task.input_grid, 'Generated Input Grid')
    plot_one(axs[1, 1], generated_task.output_grid, 'Generated Output Grid')
    
    plt.tight_layout()
    pl
