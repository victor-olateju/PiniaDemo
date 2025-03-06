

export const TASK_COLLECTION = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description 2',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Description 3',
      status: 'pending'
    },
    {
      id: 4,
      title: 'Task 4',
      description: 'Description 4',
      status: 'pending'
    },
    {
      id: 5,
      title: 'Task 5',
      description: 'Description 5',
      status: 'pending'
    }
  ]
  
  export const TASK_ITEMs = [
  {
    id: 1,
    title: 'Task 1',
    requiresSubmit: false,
    status: 'completed',
    fields: [{
      id: '1-1',
      type: 'paragraph',
      content: 'This is a paragraph',
      size: {
        lg: 12,
        md: 12,
        sm: 12,
        xs: 12
      }
    },{
    id: '1-2',
      type: 'paragraph',
      content: 'This is a paragraph',
      size: {
        lg: 12,
        md: 12,
        sm: 12,
        xs: 12
      }
    }
    ]
  
  }, {
    id: 2,
    title: 'Task 2',
    requiresSubmit: true,
    status: 'completed',
    fields: [{
        id: '2-1',
        type: 'paragraph',
        content: 'This is a paragraph',
        size: {
          lg: 12,
          md: 12,
          sm: 12,
          xs: 12
        }
      },{
      id: '2-2',
        type: 'paragraph',
        content: 'This is a paragraph',
        size: {
          lg: 12,
          md: 12,
          sm: 12,
          xs: 12
        }
      },{
      id: '2-3',
      type: 'inputText',
      label: 'first name',
      name: 'first_name',
      optional: false,
      validation: {
        required: true,
        minLength: 3,
        maxLength: 300
      },
      size: {
        lg: 4,
        md: 6,
        sm: 6,
        xs: 12
      }
    },{
      id: '2-4',
      type: 'inputText',
      label: 'last name',
      name: 'last_name Optional',
      optional: true,
      validation: {
        required: false,
        minLength: 3,
        maxLength: 300
      },
      size: {
        lg: 4,
        md: 6,
        sm: 6,
        xs: 12
      }
    },
    {
        id: '2-5',
        type: 'inputDocument',
        label: 'photo',
        name: 'photo',
        optional: false,
        validation: {
          acceptType: 'image/*',
        },
        size: {
          lg: 4,
          md: 6,
          sm: 6,
          xs: 12
        }
        },
        {
            id: '2-6',
            type: 'inputDocument',
            label: 'utility bill',
            name: 'utility_bill',
            optional: false,
            validation: {
              acceptType: 'image/*',
            },
            size: {
              lg: 4,
              md: 6,
              sm: 6,
              xs: 12
            }
            }        
    ]
  },
  {
    id: 3,
    title: 'Task 3',
    requiresSubmit: true,
    status: 'completed',
    fields: [{
      id: '3-1',
      type: 'inputDocument',
      label: 'photo',
      optional: false,
      validation: {
        acceptType: 'image/*',
      },
      size: {
        lg: 4,
        md: 6,
        sm: 6,
        xs: 12
      }
    },{
      id: '3-2',
      type: 'inputText',
      label: 'last name',
      optional: false,
      validation: {
        required: true,
        minLength: 3,
        maxLength: 300
      },
      size: {
        lg: 6,
        md: 6,
        sm: 6,
        xs: 12
      }
    }
    ]
  }
  ]