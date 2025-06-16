import { render, fireEvent } from "@testing-library/react";
import { AppCheckbox } from "../index";

describe("AppCheckbox", () => {
  it("renders checked when isChecked is true", () => {
    const { getByRole } = render(
      <AppCheckbox isChecked={true} handleChange={jest.fn()} />
    );

    const checkbox = getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it("renders unchecked when isChecked is false", () => {
    const { getByRole } = render(
      <AppCheckbox isChecked={false} handleChange={jest.fn()} />
    );

    const checkbox = getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  it("calls handleChange when clicked", () => {
    const handleChange = jest.fn();

    const { getByRole } = render(
      <AppCheckbox isChecked={false} handleChange={handleChange} />
    );

    const checkbox = getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("prevents click event propagation", () => {
    const handleClick = jest.fn();
    const handleChange = jest.fn();

    const { getByRole } = render(
      <div onClick={handleClick}>
        <AppCheckbox isChecked={false} handleChange={handleChange} />
      </div>
    );

    const checkbox = getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(handleClick).not.toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalled();
  });
});
