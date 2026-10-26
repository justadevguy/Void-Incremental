// Init decimal
const Decimal = window.Decimal

const void_main_display = document.getElementById("void_main_display")

let sub_elements = {
    // Sorted by reset layer

    void: {
        void_display: void_main_display,
        void_label: void_main_display.children[0],
        void_per_tick_label: void_main_display.children[1],
        double_void_button: void_main_display.children[2],
        more_base_void_button: void_main_display.children[3],
        quintuple_void_button: void_main_display.children[4]
    }
}

let decimals = {
    // Sorted by reset layer
    // decimals are game-state vars like void

    void: {
        void: new Decimal(0),
        void_to_add: new Decimal(0),

        double_void: {
            cost: new Decimal(20),
            mult: new Decimal(1)
        },

        more_base_void: {
            cost: new Decimal(10),
            amount: new Decimal(0)
        },

        quintuple_void: {
            cost: new Decimal(1000),
            mult: new Decimal(1)
        },
    }
}

function updateUI() {
    // Set text of void elements
    sub_elements.void.void_label.innerText = "Void: " + decimals.void.void
    sub_elements.void.void_per_tick_label.innerText = "Void/sec: " + decimals.void.void_to_add.mul(10)
    sub_elements.void.double_void_button.innerText = "2x Void. Cost: " + decimals.void.double_void.cost + ". (Currently: " + decimals.void.double_void.mult + "x)"
    sub_elements.void.more_base_void_button.innerText = "+1 Base Void. Cost: " + decimals.void.more_base_void.cost + ". (Currently: +" + decimals.void.more_base_void.amount + ")"
    sub_elements.void.quintuple_void_button.innerText = "5x Void. Cost: " + decimals.void.quintuple_void.cost + ". (Currently: " + decimals.void.quintuple_void.mult + "x)"
}

updateUI()

let loop = setInterval(() => {
    let Base = new Decimal(decimals.void.more_base_void.amount
        .add(1)
    )
    let Mults = new Decimal(decimals.void.double_void.mult
        .mul(decimals.void.quintuple_void.mult)
    )

    decimals.void.void_to_add = (Base.mul(Mults)).div(10)
    // decimals.void = container, void = container for void variable
    decimals.void.void = decimals.void.void.add(decimals.void.void_to_add)

    updateUI()
}, 100);

sub_elements.void.double_void_button.onclick = function() {
    if (decimals.void.void.gte(decimals.void.double_void.cost)) {
        decimals.void.void = decimals.void.void.sub(decimals.void.double_void.cost)
        decimals.void.double_void.mult = decimals.void.double_void.mult.mul(2)
        decimals.void.double_void.cost = decimals.void.double_void.cost.mul(3)
        updateUI()
    }
}
sub_elements.void.more_base_void_button.onclick = function() {
    if (decimals.void.void.gte(decimals.void.more_base_void.cost)) {
        decimals.void.void = decimals.void.void.sub(decimals.void.more_base_void.cost)
        decimals.void.more_base_void.amount = decimals.void.more_base_void.amount.add(1)
        decimals.void.more_base_void.cost = decimals.void.more_base_void.cost.mul(3)
        updateUI()
    }
}
sub_elements.void.quintuple_void_button.onclick = function() {
    if (decimals.void.void.gte(decimals.void.quintuple_void.cost)) {
        decimals.void.void = decimals.void.void.sub(decimals.void.quintuple_void.cost)
        decimals.void.quintuple_void.mult = decimals.void.quintuple_void.mult.mul(5)
        decimals.void.quintuple_void.cost = decimals.void.quintuple_void.cost.mul(500)
        updateUI()
    }
}