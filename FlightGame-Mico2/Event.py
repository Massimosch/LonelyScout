import random

# TEMP DATA!!!
event_names = ["enemy", "accident", "merchant", "thief"]
event_types = {
    "enemy": {
        "description": "enemy appears",
        "amount": "200",
        "problem_description": "do you want to fight or avoid?",
        "player_actions": ["fight", "flee"]
    },
    "accident": {
        "description": "you slip and hurt your arm",
        "amount": "-100",
        "problem_description": "do you want to use medicine or wait to heal?",
        "player_actions": ["use medicine", "wait"]
    },
    "merchant": {
        "description": "Albert the poo merchant",
        "amount": "200",
        "problem_description": "do you need to buy or sell?",
        "player_actions": ["buy/sell", "leave"]
    },
    "thief": {
        "description": "thief steals from you",
        "amount": "200",
        "problem_description": "do you want to chase down the thief or let it go?",
        "player_actions": ["chase", "forget it"]
    }
}