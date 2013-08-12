before ->
    BankAccount.find req.params.id, (err, ba) =>
        if err or not ba
            send error: true, msg: "BankAccount not found", 404
        else
            @ba = ba
            next()
, only: ['show', 'destroy', 'getOperations']



action 'index', ->
    BankAccount.all (err, bas) ->
        if err
            send error: true, msg: 'Server error occurred while retrieving data'
        else
            send bas, 201

action 'destroy', ->
    @ba.destroy (err) ->
        if err?
            send error: true, msg: "Server error while deleting the bank account", 500
        else
            send success: true, 200

action 'show', ->
    send @ba, 200

action 'getOperations', ->
    BankOperation = compound.models.BankOperation
    BankOperation.allFromBankAccountDate @ba, (err, bo) ->
        if err
            send error: true, msg: 'Server error occurred while retrieving data', 500
        else
            send bo, 200
