$(document).ready(function() {
    var todoListContainer = $('#container');

    var taskListNode = $('<ol></ol>');
    taskListNode.addClass('task-list-wrapper');

    function init() {
        jQuery.ajax('../server/action.getAllTask.php', {
            success: function(response) {
                for (var i in response) {
                    var task = response[i];

                    var oneTaskNode = generateOneTask(task);
                    taskListNode.append(oneTaskNode);
                }

                todoListContainer.append(taskListNode);

                var addTaskButtonNode = $('<input type="button" value="Ajouter une tâche" />');
                addTaskButtonNode.on('click', function() {
                    var emptyTask = {
                        idtask: null,
                        name: null,
                        status: 0
                    }
                    var emptyTaskNode = generateOneTask(emptyTask);
                    taskListNode.append(emptyTaskNode);
                    emptyTaskNode.trigger('click');
                });
                todoListContainer.append(addTaskButtonNode);
            }
        });
    }

    function generateOneTask(task) {
        var oneTaskNode = $('<li></li>');
        oneTaskNode.data('task', task);
        var oneTaskLabelNode = $('<span></span>');
        oneTaskLabelNode.addClass('task-name');
        if (null != task.name) {
            oneTaskLabelNode.text(task.name);
        }
        oneTaskNode.append(oneTaskLabelNode);
        oneTaskNode.addClass('task-item');

        var oneTaskStatusInput = $('<input type="checkbox" class="task-checkbox"></input>');
        oneTaskNode.prepend(oneTaskStatusInput);

        if (1 == task.status) {
            oneTaskNode.addClass('complete');
            oneTaskStatusInput.attr('checked', 'checked');
            attachStartTaskHandler(oneTaskNode);
        } else {
            oneTaskNode.addClass('uncomplete');
            attachEndTaskHandler(oneTaskNode)
        }

        oneTaskNode.one('click', editTaskHandler);

        return oneTaskNode;
    }

    function endTaskHandler(e) {
        e.stopPropagation();

        var $this = $(this);
        var taskNode = $this.parent('.task-item');
        var idtask = taskNode.data('task').idtask;
        var newStatus = 1;

        jQuery.ajax('../server/action.changeTaskStatus.php', {
            data: {
                idtask: idtask,
                status: newStatus
            },
            success: function() {
                taskNode.toggleClass('uncomplete', false);
                taskNode.toggleClass('complete', true);

                taskNode.data('task').status = newStatus;
                attachStartTaskHandler(taskNode);
            }
        });
    }

    function startTaskHandler(e) {
        e.stopPropagation();

        var $this = $(this);
        var taskNode = $this.parent('.task-item');
        var idtask = taskNode.data('task').idtask;
        var newStatus = 0;

        jQuery.ajax('../server/action.changeTaskStatus.php', {
            data: {
                idtask: idtask,
                status: newStatus
            },
            success: function() {
                taskNode.toggleClass('complete', false);
                taskNode.toggleClass('uncomplete', true);

                taskNode.data('task').status = newStatus;
                attachEndTaskHandler(taskNode);
            }
        });
    }

    function attachEndTaskHandler(taskNode) {
        taskNode.find('input').first().one('click', endTaskHandler);
    }

    function attachStartTaskHandler(taskNode) {
        taskNode.find('input').first().one('click', startTaskHandler);
    }

    /**
     *
     * @returns {undefined}
     */
    function generateTaskEditForm(taskNode) {
        var task = taskNode.data('task');
        var taskFormNode = taskNode.find('.task-form');

        if (0 === taskFormNode.length) {
            taskFormNode = $('<form class="task-form"></form>');

            taskFormNode.append($('<input type="hidden" name="idtask" />'))
            taskFormNode.append($('<input type="text" name="name" id="name" />'));
            taskFormNode.append($('<input type="submit" value="Sauvegarder" />'));
            taskFormNode.append($('<a href="#" class="close">Annuler</a>').one('click', closeEditFormHandler));

            taskFormNode.on('submit', taskFormSubmissionHandler);

            taskNode.append(taskFormNode);
        }

        taskNode.toggleClass('edit-in-progress', true);

        loadTaskDataInForm(taskFormNode, task);
        taskFormNode.focus();
        return taskFormNode;
    }

    function closeEditFormHandler(e) {
        e.stopPropagation();

        var taskNode = $(this).parents('.task-item');
        closeEditForm(taskNode);
    }

    function closeEditForm(taskNode) {
        taskNode.toggleClass('edit-in-progress', false);

        if (null != taskNode.data('task').idtask) {
            taskNode.find('.task-form').remove();
            taskNode.one('click', editTaskHandler);
        } else {
            taskNode.remove();
        }
    }

    function editTaskHandler() {
        var $this = $(this);
        generateTaskEditForm($this);
    }

    function loadTaskDataInForm(formNode, task) {
        if (task.idtask) {
            formNode.find('[name=idtask]').val(task.idtask);
        } else {
            formNode.find('[name=idtask]').val(null);
        }

        formNode.find('[name=name]').val(task.name);
    }

    function loadTaskDataFromForm(formNode) {
        var task = {};

        task.idtask = formNode.find('[name=idtask]').val();
        task.name = formNode.find('[name=name]').val();

        return task;
    }

    function taskFormSubmissionHandler(e) {
        e.preventDefault();
        var $this = $(this);
        var currentTaskNode = $this.parents('.task-item');

        var task = loadTaskDataFromForm($this);

        if (task.name == '') {
            return;
        }

        jQuery.ajax('../server/action.saveTask.php', {
            data: {
                idtask: task.idtask,
                name: task.name
            },
            success: function(response) {
                currentTaskNode.data('task', task);
                currentTaskNode.find('.task-name').text(task.name);

                if (task.idtask == '') {
                    task.idtask = response;

                    currentTaskNode.find('.task-form [name=idtask]').val(task.idtask);
                    currentTaskNode.find('.task-form [name=name]').val(task.name);
                }

                closeEditForm(currentTaskNode);
            }
        });
    }


    init();
});