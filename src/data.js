export const tableData = {
    headers: [
        {
            id: "taskName",
            title: "Task name"
        },
        {
            id: "assignee",
            title: "Assignee",
            sorting: true
        },
        {
            id: "priority",
            title: "Priority",
            sorting: true
        },
        {
            id: "due",
            title: "Due",
            sorting: true
        },
        {
            id: "board",
            title: "Board",
            resizable: true,
            sorting: true
        },
        {
            id: "tags",
            title: "Tags",
            width: "300px",
            resizable: true,
            sorting: true
        },
        {
            id: "col1",
            title: "Col 1",
            width: "70px",
        },
        {
            id: "col2",
            title: "Col 2"
        },
        {
            id: "col3",
            title: "Col 3"
        },
        {
            id: "col4",
            title: "Col 4"
        },
        {
            id: "col5",
            title: "Col 5"
        },
        {
            id: "col6",
            title: "Col 6"
        },
    ],
    items: {
        rows: [
            {   
                cols: {             
                    taskName: "Level 1",
                    assignee: "Mike,John",
                    priority: 2,
                    due: "2 Apr",
                    board: "Completed",
                    tags: "Design",
                    col1: "Col 1",
                    col2: "Col 2",
                    col3: "Col 3",
                    col4: "Col 4",
                    col5: "Col 5",
                    col6: "Col 6"
                },
                children: [
                    {
                        cols: {
                            taskName: "Level 2",
                            assignee: "James,Karen,Cris",
                            priority: 1,
                            due: "12 May",
                            board: "To-do",
                            tags: "UI",
                            col1: "Col 1",
                            col2: "Col 2",
                            col3: "Col 3",
                            col4: "Col 4",
                            col5: "Col 5",
                            col6: "Col 6"
                        }
                    },
                    {
                        cols: {
                            taskName: "Level 2",
                            assignee: "Terry",
                            priority: 3,
                            due: "14 Aug",
                            board: "Review",
                            tags: "Research",
                            col1: "Col 1",
                            col2: "Col 2",
                            col3: "Col 3",
                            col4: "Col 4",
                            col5: "Col 5",
                            col6: "Col 6"
                        },
                        children: [
                            {
                                cols: {
                                    taskName: "Level 3a",
                                    assignee: "Christopher",
                                    priority: 2,
                                    due: "14 Aug",
                                    board: "Review",
                                    tags: "Research",
                                    col1: "Col 1",
                                    col2: "Col 2",
                                    col3: "Col 3",
                                    col4: "Col 4",
                                    col5: "Col 5",
                                    col6: "Col 6"
                                }
                            },
                            {
                                cols: {
                                    taskName: "Level 3b",
                                    assignee: "Christopher",
                                    priority: 3,
                                    due: "13 Aug",
                                    board: "Review",
                                    tags: "Research",
                                    col1: "Col 1",
                                    col2: "Col 2",
                                    col3: "Col 3",
                                    col4: "Col 4",
                                    col5: "Col 5",
                                    col6: "Col 6"
                                }
                            },
                            {
                                cols: {
                                    taskName: "Level 3c",
                                    assignee: "James",
                                    priority: 1,
                                    due: "13 Aug",
                                    board: "Review",
                                    tags: "Research",
                                    col1: "Col 1",
                                    col2: "Col 2",
                                    col3: "Col 3",
                                    col4: "Col 4",
                                    col5: "Col 5",
                                    col6: "Col 6"
                                }
                            }
                        ]
                    },
                    {
                        cols: {
                            taskName: "Level 2",
                            assignee: "Terry",
                            priority: 3,
                            due: "14 Aug",
                            board: "Completed",
                            tags: "UI",
                            col1: "Col 1",
                            col2: "Col 2",
                            col3: "Col 3",
                            col4: "Col 4",
                            col5: "Col 5",
                            col6: "Col 6"
                        }
                    }
                ]
            }, {
                cols: {             
                    taskName: "Level 1 (low)",
                    assignee: "John",
                    priority: 1,
                    due: "2 Apr",
                    board: "Completed",
                    tags: "Design",
                    col1: "Col 1",
                    col2: "Col 2",
                    col3: "Col 3",
                    col4: "Col 4",
                    col5: "Col 5",
                    col6: "Col 6"
                },
            }
        ],
        sections: [
            {
                id: "redesign",
                title: "Redesign",
                rows: [
                    {   
                        cols: {             
                            taskName: "Level 1",
                            assignee: "Mike,John",
                            priority: 1,
                            due: "2 Apr",
                            board: "Completed",
                            tags: "Design",
                            col1: "Col 1",
                            col2: "Col 2",
                            col3: "Col 3",
                            col4: "Col 4",
                            col5: "Col 5",
                            col6: "Col 6"
                        },
                        children: [
                            {
                                cols: {
                                    taskName: "Level 2",
                                    assignee: "James,Karen,Cris",
                                    priority: 1,
                                    due: "12 May",
                                    board: "To-do",
                                    tags: "UI",
                                    col1: "Col 1",
                                    col2: "Col 2",
                                    col3: "Col 3",
                                    col4: "Col 4",
                                    col5: "Col 5",
                                    col6: "Col 6"
                                }
                            },
                            {
                                cols: {
                                    taskName: "Level 2",
                                    assignee: "Terry",
                                    priority: 3,
                                    due: "14 Aug",
                                    board: "Review",
                                    tags: "Research",
                                    col1: "Col 1",
                                    col2: "Col 2",
                                    col3: "Col 3",
                                    col4: "Col 4",
                                    col5: "Col 5",
                                    col6: "Col 6"
                                },
                                open: false,
                                children: [
                                    {
                                        cols: {
                                            taskName: "Level 3a",
                                            assignee: "Christopher",
                                            priority: 2,
                                            due: "14 Aug",
                                            board: "Review",
                                            tags: "Research",
                                            col1: "Col 1",
                                            col2: "Col 2",
                                            col3: "Col 3",
                                            col4: "Col 4",
                                            col5: "Col 5",
                                            col6: "Col 6"
                                        }
                                    },
                                    {
                                        cols: {
                                            taskName: "Level 3b",
                                            assignee: "Christopher",
                                            priority: 3,
                                            due: "13 Aug",
                                            board: "Review",
                                            tags: "Research",
                                            col1: "Col 1",
                                            col2: "Col 2",
                                            col3: "Col 3",
                                            col4: "Col 4",
                                            col5: "Col 5",
                                            col6: "Col 6"
                                        }
                                    }
                                ]
                            },
                            {
                                cols: {
                                    taskName: "Level 2",
                                    assignee: "Terry,Angela",
                                    priority: 3,
                                    due: "14 Aug",
                                    board: "Completed",
                                    tags: "UI",
                                    col1: "Col 1",
                                    col2: "Col 2",
                                    col3: "Col 3",
                                    col4: "Col 4",
                                    col5: "Col 5",
                                    col6: "Col 6"
                                }
                            }
                        ]
                    }, {
                        cols: {             
                            taskName: "Level 1",
                            assignee: "John",
                            priority: 1,
                            due: "2 Apr",
                            board: "Completed",
                            tags: "Design",
                            col1: "Col 1",
                            col2: "Col 2",
                            col3: "Col 3",
                            col4: "Col 4",
                            col5: "Col 5",
                            col6: "Col 6"
                        },
                    }
                ]
            },
            {
                id: "tasks-in-a-project",
                title: "Tasks in a project",
                rows: [
                    {
                        cols: {             
                            taskName: "Level 1",
                            assignee: "John",
                            priority: 1,
                            due: "2 Apr",
                            board: "Completed",
                            tags: "Design",
                            col1: "Col 1",
                            col2: "Col 2",
                            col3: "Col 3",
                            col4: "Col 4",
                            col5: "Col 5",
                            col6: "Col 6"
                        },
                    }
                ]
            }
        ]
    }
}