import sys

def main():
    if len(sys.argv) != 3:
        print "Usage: trim_stop_times.py <input.txt> <output.txt>"
        return

    with open(sys.argv[1]) as input_file, open(sys.argv[2], "w") as output_file:
        first_line = next(input_file)
        output_file.write(first_line)
        for line in input_file:
            stop_id = line.split(",")[3]
            if stop_id in ("10103", "10490", "10596"):
                output_file.write(line)

if __name__ == "__main__":
    main()
