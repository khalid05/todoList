$(document).ready(function() {
    var todoListContainer = $('#container');

    var taskListNode = $('<ol></ol>');
    taskListNode.addClass('task-list-wrapper');

    function init() {
        jQuery.ajax('../server/action.getAllTask.php', {
            success: function(response) {
                for (var i in response) {
                    var task = response[i];

                    var oneTaskNode = $('<li></li>');
                    oneTaskNode.data('task', task);
                    oneTaskNode.text(task.name);
                    oneTaskNode.addClass('task-item');

                    var oneTaskStatusInput = $('<input type="checkbox"></input>');
                    oneTaskNode.prepend(oneTaskStatusInput);


                    if (1 == task.status) {
                        oneTaskNode.addClass('complete');
                        oneTaskStatusInput.attr('checked', 'checked');
                        attachStartTaskHandler(oneTaskNode);
                    } else {
                        oneTaskNode.addClass('uncomplete');
                        attachEndTaskHandler(oneTaskNode)
                    }

                    taskListNode.append(oneTaskNode);
                }

                todoListContainer.append(taskListNode);
            }
        });
    }


    function endTaskHandler() {
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

    function startTaskHandler() {
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

    
    init();
});