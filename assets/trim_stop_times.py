import sys

def main():
    if len(sys.argv) != 3:
        print "Usage: trim_stop_times.py <input.txt> <output.txt>"
        return

    with open(sys.argv[1]) as input_file, open(sys.argv[2], "w") as output_file:
        first_line = next(input_file)
        output_file.write(first_line)
        for line in input_file:
            #departure_time = line.split(",")[1]
            #if departure_time >= "20:15:00" and departure_time <= "20:45:00":
            stop_id = line.split(",")[3]
            if stop_id in ("2784", "3350", "3562"):
                output_file.write(line)

if __name__ == "__main__":
    main()
