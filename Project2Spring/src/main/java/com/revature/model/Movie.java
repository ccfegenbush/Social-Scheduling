package com.revature.model;

public class Movie {
	private int id;
	private String title;
	private int numBlades;
	private int year;

	public Movie() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Movie(int id, String title, int numBlades, int year) {
		super();
		this.id = id;
		this.title = title;
		this.numBlades = numBlades;
		this.year = year;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public int getNumBlades() {
		return numBlades;
	}

	public void setNumBlades(int numBlades) {
		this.numBlades = numBlades;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		result = prime * result + numBlades;
		result = prime * result + ((title == null) ? 0 : title.hashCode());
		result = prime * result + year;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Movie other = (Movie) obj;
		if (id != other.id)
			return false;
		if (numBlades != other.numBlades)
			return false;
		if (title == null) {
			if (other.title != null)
				return false;
		} else if (!title.equals(other.title))
			return false;
		if (year != other.year)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Movie [id=" + id + ", title=" + title + ", numBlades=" + numBlades + ", year=" + year + "]";
	}

}