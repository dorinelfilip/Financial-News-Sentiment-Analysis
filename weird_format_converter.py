# This was used to convert Financial PhraseBank weird format to csv

def main():
    name = "Sentences_50Agree.txt"
    destination = "agree50Ds.csv"
    with open(destination, "a") as f:
                f.write("label,text\n")
    with open(name) as file:
        lines = [line.rstrip() for line in file]
        for line in lines:
            values = line.split("@")
            with open(destination, "a") as f:
                f.write(values[1] + ",\"" + values[0] + "\"\n")


if __name__ == "__main__":
    main()