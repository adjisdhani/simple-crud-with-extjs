Ext.onReady(function() {
    // Create a store to hold teacher data
    var teacherStore = Ext.create('Ext.data.Store', {
        fields: ['id', 'name', 'subject', 'email'],
        pageSize: 100,  // Define how many records per page
        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                rootProperty: 'teachers',
                totalProperty: 'total'
            }
        },
        data: { 
        	teachers: [
	            {id: 1, name: 'John Doe', subject: 'Mathematics', email: 'john@example.com'},
	            {id: 2, name: 'Jane Smith', subject: 'Science', email: 'jane@example.com'},
	            {id: 3, name: 'Michael Johnson', subject: 'History', email: 'michael@example.com'},
	            {id: 4, name: 'Emily Davis', subject: 'English', email: 'emily@example.com'},
	            {id: 5, name: 'Sarah Lee', subject: 'Geography', email: 'sarah@example.com'},
	            {id: 6, name: 'David Wilson', subject: 'Physics', email: 'david@example.com'},
	            {id: 7, name: 'Laura Clark', subject: 'Biology', email: 'laura@example.com'},
	            {id: 8, name: 'James White', subject: 'Chemistry', email: 'james@example.com'}
	        ],
	        total: 8
        }
    });

    // Define the teacher grid panel
    var teacherGrid = Ext.create('Ext.grid.Panel', {
        title: 'Simple CRUD with Ext JS ( Teacher Data Management )',
        store: teacherStore,
        renderTo: 'teacher-grid',
        width: 600,
        height: 400,
        columns: [
            { text: 'ID', dataIndex: 'id', flex: 1 },
            { text: 'Name', dataIndex: 'name', flex: 2 },
            { text: 'Subject', dataIndex: 'subject', flex: 2 },
            { text: 'Email', dataIndex: 'email', flex: 3 }
        ],
        tbar: [
            { 
                text: 'Add Teacher', 
                handler: function() {
                    // Create a window for adding a new teacher
                    Ext.create('Ext.window.Window', {
                        title: 'Add Teacher',
                        modal: true,
                        width: 400,
                        height: 300,
                        layout: 'form',
                        items: [
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Name',
                                itemId: 'nameField'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Subject',
                                itemId: 'subjectField'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Email',
                                itemId: 'emailField'
                            }
                        ],
                        buttons: [
                            {
                                text: 'Save',
                                handler: function() {
                                    var name = this.up('window').down('#nameField').getValue();
                                    var subject = this.up('window').down('#subjectField').getValue();
                                    var email = this.up('window').down('#emailField').getValue();

                                    // Create a new teacher object
                                    var newTeacher = {
                                        id: teacherStore.getCount() + 1, // Set the new ID based on the current store count
                                        name: name,
                                        subject: subject,
                                        email: email
                                    };

                                    // Add the new teacher to the store
                                    teacherStore.add(newTeacher);
                                    // Close the window
                                    this.up('window').close();
                                }
                            },
                            {
                                text: 'Cancel',
                                handler: function() {
                                    this.up('window').close();
                                }
                            }
                        ]
                    }).show();
                }
            },
            { 
                text: 'Delete Teacher', 
                handler: function() {
                    var selected = teacherGrid.getSelectionModel().getSelection();
                    if (selected.length > 0) {
                        teacherStore.remove(selected);

                        teacherStore.loadData(teacherStore.getRange(), false);
                    } else {
                        alert('Please select a teacher to delete!');
                    }
                }
            },
            { 
                text: 'View Teacher', 
                handler: function() {
                    var selected = teacherGrid.getSelectionModel().getSelection();
                    if (selected.length > 0) {
                        var teacher = selected[0].data;
                        Ext.Msg.alert('Teacher Details', 
                            `ID: ${teacher.id}<br>Name: ${teacher.name}<br>Subject: ${teacher.subject}<br>Email: ${teacher.email}`);
                    } else {
                        alert('Please select a teacher to view!');
                    }
                }
            },
            { 
                text: 'Update Teacher', 
                handler: function() {
                    var selected = teacherGrid.getSelectionModel().getSelection();
                    if (selected.length > 0) {
                        var teacher = selected[0];
                        Ext.create('Ext.window.Window', {
                            title: 'Update Teacher',
                            modal: true,
                            width: 400,
                            height: 300,
                            layout: 'form',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Name',
                                    value: teacher.get('name'),
                                    itemId: 'nameField'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Subject',
                                    value: teacher.get('subject'),
                                    itemId: 'subjectField'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Email',
                                    value: teacher.get('email'),
                                    itemId: 'emailField'
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Save',
                                    handler: function() {
                                        var updatedName = this.up('window').down('#nameField').getValue();
                                        var updatedSubject = this.up('window').down('#subjectField').getValue();
                                        var updatedEmail = this.up('window').down('#emailField').getValue();

                                        // Update the selected teacher record
                                        teacher.set('name', updatedName);
                                        teacher.set('subject', updatedSubject);
                                        teacher.set('email', updatedEmail);

                                        // Commit the changes and close the window
                                        teacherStore.commitChanges();
                                        this.up('window').close();
                                    }
                                },
                                {
                                    text: 'Cancel',
                                    handler: function() {
                                        this.up('window').close();
                                    }
                                }
                            ]
                        }).show();
                    } else {
                        alert('Please select a teacher to update!');
                    }
                }
            },
            { 
                text: 'Refresh',
                hidden: true,
                handler: function() {
                    // Manually refresh the grid by loading the data again without clearing the added items
                    teacherStore.loadData(teacherStore.getRange(), false);
                }
            }
        ],
        // bbar: [
        //     {
        //         xtype: "pagingtoolbar",
        //         store: teacherStore,
        //         dock: "bottom",
        //         displayInfo: true,
        //         displayMsg: "Showing {0} to {1} of {2} entries",
        //         doRefresh : function(){
		// 	         teacherStore.loadData(teacherStore.getRange(), false);
		//         }
        //     }
        // ]
    });
});