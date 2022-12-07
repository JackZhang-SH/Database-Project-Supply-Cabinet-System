package SupplyCabinetChain.Backend.entity;

public class combination {
    private v_branch v;
    private int price;

    @Override
    public String toString() {
        return "combination{" +
                "v=" + v +
                ", price=" + price +
                '}';
    }

    public combination(v_branch v, int price) {
        this.v = v;
        this.price = price;
    }

    public v_branch getV() {
        return v;
    }

    public void setV(v_branch v) {
        this.v = v;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}
