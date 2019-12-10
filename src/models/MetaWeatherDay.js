class MetaWeatherDay {
  constructor(data) {
    this.data = data;
  }

  get applicableDate() {
    return new Date(this.data.applicable_date)
  }

  get isToday() {
    const today = new Date()
    const applicableDate = this.applicableDate
    return applicableDate.getDate() == today.getDate() &&
    applicableDate.getMonth() == today.getMonth() &&
    applicableDate.getFullYear() == today.getFullYear()
  }

  get temperature() {
    return {
      min: this.data.min_temp,
      max: this.data.max_temp
    }
  }

  get publicData() {
    return {
      temperature: this.temperature,
      isToday: this.isToday
    }
  }
}

module.exports = MetaWeatherDay
