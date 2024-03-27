# calculator.py

import sys

def calculate(number):
    # Here you can implement your calculation logic
    # For example, let's just double the number
    result = number * 2
    return result

if __name__ == "__main__":
    # Ensure there are command line arguments provided
    if len(sys.argv) < 2:
        print("Error: Please provide a number as input.")
        sys.exit(1)

    # Read the number from the command line argument
    number = float(sys.argv[1])

    # Call the calculate function and print the result
    print(calculate(number))
