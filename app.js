Ext.application({
    name: 'CrudApp',

    launch: function() {
        // Data Model
        Ext.define('User', {
            extend: 'Ext.data.Model',
            fields: [
                { name: 'id', type: 'int' },
                { name: 'name', type: 'string' },
                { name: 'email', type: 'string' },
                { name: 'phone', type: 'string' }
            ]
        });

        // Store untuk data dan paging memory
        var store = Ext.create('Ext.data.Store', {
            model: 'User',
            pageSize: 5,
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            data: {
                data: [
                    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123456789' },
                    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987654321' },
                    { id: 3, name: 'Michael Johnson', email: 'michael@example.com', phone: '555123456' },
                    { id: 4, name: 'Alice Brown', email: 'alice@example.com', phone: '555987654' },
                    { id: 5, name: 'David Wilson', email: 'david@example.com', phone: '555654321' },
                    { id: 6, name: 'Laura Davis', email: 'laura@example.com', phone: '555321987' },
                    { id: 7, name: 'Steve Harris', email: 'steve@example.com', phone: '555777666' },
                    { id: 8, name: 'Nancy Clark', email: 'nancy@example.com', phone: '555888999' },
                    { id: 9, name: 'Chris Martin', email: 'chris@example.com', phone: '555333444' },
                    { id: 10, name: 'Sarah Moore', email: 'sarah@example.com', phone: '555222111' }
                ]
            },
            autoLoad: true
        });

        // Grid dengan Paging
        var grid = Ext.create('Ext.grid.Panel', {
            title: 'User Management',
            store: store,
            width: 600,
            height: 400,
            renderTo: Ext.getBody(),
            columns: [
                { text: 'ID', dataIndex: 'id', width: 50 },
                { text: 'Name', dataIndex: 'name', flex: 1 },
                { text: 'Email', dataIndex: 'email', width: 200 },
                { text: 'Phone', dataIndex: 'phone', width: 150 }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                store: store,
                displayInfo: true,
                displayMsg: 'Showing {0} - {1} of {2}',
                emptyMsg: 'No users to display'
            },
            tbar: [
                {
                    text: 'Add',
                    handler: function() {
                        var record = Ext.create('User', {
                            id: store.getCount() + 1,
                            name: 'New User',
                            email: 'newuser@example.com',
                            phone: '555000000'
                        });
                        store.add(record);
                    }
                },
                {
                    text: 'Delete',
                    handler: function() {
                        var selection = grid.getSelectionModel().getSelection();
                        if (selection.length > 0) {
                            store.remove(selection);
                        } else {
                            Ext.Msg.alert('Error', 'Please select a user to delete.');
                        }
                    }
                }
            ]
        });
    }
});
