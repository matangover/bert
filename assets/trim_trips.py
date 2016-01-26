import sys

def main():
    if len(sys.argv) != 4:
        print "Usage: trim_trips.py <stop_times.txt> <input.txt> <output.txt>"
        return

    trip_ids = set()
    with open(sys.argv[1]) as stop_times:
        next(stop_times)
        for line in stop_times:
            trip_id = line.split(",")[0]
            trip_ids.add(trip_id)

    with open(sys.argv[2]) as input_file, open(sys.argv[3], "w") as output_file:
        first_line = next(input_file)
        output_file.write(first_line)
        for line in input_file:
            trip_id = line.split(",")[2]
            if trip_id in trip_ids:
                output_file.write(line)

if __name__ == "__main__":
    main()
